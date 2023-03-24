import { formatFiles, generateFiles, getProjects, getWorkspaceLayout, names, ProjectConfiguration, Tree } from '@nrwl/devkit';
import * as path from 'path';
import { WorkflowGcpGeneratorSchema } from './schema';

export default async function (tree: Tree, schema: WorkflowGcpGeneratorSchema) {
  const project: ProjectConfiguration = getProjects(tree).get(schema.projectName);

  if (!project) throw new Error(`${schema.projectName} project cannot be found`);

  const nameVariations = names(schema.name);

  const templateSubstitutions = {
    ...nameVariations,
    gcpName: nameVariations.fileName.replace(new RegExp('-', 'g'), '_'),
    template: '',
  };

  generateFiles(tree, path.join(__dirname, 'files'), project.root, templateSubstitutions);

  await formatFiles(tree);
}
