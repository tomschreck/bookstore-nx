import { formatFiles, generateFiles, getProjects, names, ProjectConfiguration, Tree } from '@nrwl/devkit';
import * as path from 'path';
import { DomainEntityGeneratorSchema } from './schema';

export default async function (tree: Tree, schema: DomainEntityGeneratorSchema) {
  const project: ProjectConfiguration = getProjects(tree).get(schema.projectName);

  if (!project) throw new Error(`${schema.projectName} project cannot be found`);

  const nameVariations = names(schema.name);
  const directory: string = `2_infrastructure/entities`;
  const pathToFolder: string = path.join(project.sourceRoot, directory);

  const templateSubstitutions = {
    ...nameVariations,
    template: '',
  };

  generateFiles(tree, path.join(__dirname, 'files'), pathToFolder, templateSubstitutions);

  await formatFiles(tree);
}
