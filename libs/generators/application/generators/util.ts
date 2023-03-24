import { ProjectConfiguration } from '@nrwl/devkit';
import { NormalizedSchema } from '../generator';
import { ApplicationGeneratorSchema } from '../schema';

export function getDirectory(normalizedSchema: NormalizedSchema | ApplicationGeneratorSchema): string {
  return normalizedSchema.type ? `${normalizedSchema.scope}/${normalizedSchema.type}` : normalizedSchema.scope;
}

export function getTags(normalizedSchema: NormalizedSchema): string {
  const typeTag: string = normalizedSchema.type ? `, type:${normalizedSchema.type}` : '';
  const domainTag: string = normalizedSchema.domain ? `, domain:${normalizedSchema.domain}` : '';
  return `scope:${normalizedSchema.scope}${typeTag}, framework:${normalizedSchema.framework}${domainTag}`;
}

export function cleanupBuildTarget(projectConfig: ProjectConfiguration) {
  projectConfig.targets['build'].options.assets = [];
  projectConfig.targets['build'].configurations['production'].fileReplacements = [];
}

export function addDeployTargets(projectConfig: ProjectConfiguration, normalizedSchema: NormalizedSchema) {
  // terraform_plan
  projectConfig.targets['terraform_plan'] = {
    executor: 'nx:run-commands',
    outputs: [],
    options: {
      cwd: `${normalizedSchema.projectRoot}/infra/terraform`,
      commands: ['terraform init', 'terraform workspace select ${TERRAFORM_WORKSPACE:-default}', 'terraform plan'],
      parallel: false,
    },
  };

  // deploy
  projectConfig.targets['deploy'] = {
    dependsOn: ['push_docker_container_to_gcr'],
    executor: 'nx:run-commands',
    outputs: [],
    options: {
      cwd: `${normalizedSchema.projectRoot}/infra/terraform`,
      commands: [
        'echo "======> Terraform init.."',
        'terraform init',
        'terraform workspace select ${TERRAFORM_WORKSPACE:-default}',
        'echo ""',
        'echo ""',
        'echo "======>  Terraform apply..."',
        'terraform apply -input=false -auto-approve -var="gcr_image_tag=${CIRCLE_WORKFLOW_ID:-$(git rev-parse --short HEAD)}"',
        'echo ""',
        'echo ""',
        'echo "======>  DEPLOY TARGET FINISHED..."',
      ],
      parallel: false,
    },
  };

  // push_docker_container_to_gcr
  projectConfig.targets['push_docker_container_to_gcr'] = {
    dependsOn: ['build_docker_container'],
    executor: 'nx:run-commands',
    outputs: [],
    options: {
      cwd: './',
      commands: [
        'echo "======> Tagging image with tag ${CIRCLE_WORKFLOW_ID:-$(git rev-parse --short HEAD)}..."',
        `'docker tag signaldevs/${normalizedSchema.projectName} gcr.io/\${GCP_PROJECT:-signal-dev-fb08cb13}/${normalizedSchema.projectName}:\${CIRCLE_WORKFLOW_ID:-$(git rev-parse --short HEAD)}'`,
        'echo ""',
        'echo ""',
        'echo "======>  Pushing image to container registry..."',
        `'docker push -a gcr.io/\${GCP_PROJECT:-signal-dev-fb08cb13}/${normalizedSchema.projectName}'`,
        'echo ""',
        'echo ""',
      ],
      parallel: false,
    },
  };

  // build_docker_container
  projectConfig.targets['build_docker_container'] = {
    executor: 'nx:run-commands',
    outputs: [],
    options: {
      cwd: './',
      commands: [
        'echo "======> Building image..."',
        `'docker build --platform linux/amd64 -f ./apps/api/workflow/${normalizedSchema.projectName}/Dockerfile . -t signaldevs/${normalizedSchema.projectName}'`,
        'echo ""',
        'echo ""',
      ],
      parallel: false,
    },
  };

  // run_docker_container_locally
  projectConfig.targets['run_docker_container_locally'] = {
    executor: 'nx:run-commands',
    outputs: [],
    options: {
      cwd: './',
      commands: [`'echo "======> Running local image..."', 'docker run -it signaldevs/${normalizedSchema.projectName}/bin/bash', 'echo ""', 'echo ""'`],
      parallel: false,
    },
  };
}

// TODO: figure out a way to lookup next available PORT number
export function generatePortNumber(): number {
  return 4141;
}
