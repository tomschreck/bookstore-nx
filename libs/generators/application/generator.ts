import { getWorkspaceLayout, names, Tree } from '@nrwl/devkit';
import { ApplicationGeneratorSchema } from './schema';

import nestGenerator from './generators/nest';
import nodeGenerator from './generators/node';
import workflowGenerator from './generators/workflow';
import { getDirectory } from './generators/util';

export interface NormalizedSchema extends ApplicationGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
}

export default async function (tree: Tree, schema: ApplicationGeneratorSchema) {
  validateSchema();

  const normalizedSchema: NormalizedSchema = normalizeOptions();

  console.log('normalizedOptions', normalizedSchema);

  await applicationGeneratorFactory();

  function validateSchema() {
    // THE `Type` CONCEPT IS ONLY APPLICABLE TO API SCOPE.
    // ALL OTHER SCOPES SHOULD NOT HAVE A TYPE
    if (schema.scope !== 'api') {
      schema.type = undefined;
    }
  }

  function normalizeOptions(): NormalizedSchema {
    const name: string = names(schema.name).fileName;
    const directory: string = getDirectory(schema);
    const projectDirectory: string = directory ? `${names(directory).fileName}/${name}` : name;
    const projectName: string = projectDirectory.replace(new RegExp('/', 'g'), '-');
    const projectRoot: string = `${getWorkspaceLayout(tree).appsDir}/${projectDirectory}`;

    return {
      ...schema,
      projectName,
      projectRoot,
      projectDirectory,
    };
  }

  async function applicationGeneratorFactory() {
    if (normalizedSchema.scope === 'workflow') {
      await workflowGenerator(tree, normalizedSchema);
      return;
    }

    switch (normalizedSchema.framework) {
      case 'nest':
        await nestGenerator(tree, normalizedSchema);
        break;
      // case 'react':
      //   generateReactApplication();
      //   break;
      default:
        await nodeGenerator(tree, normalizedSchema);
    }
  }
}
