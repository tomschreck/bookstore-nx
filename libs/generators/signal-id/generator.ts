import { formatFiles, generateFiles, getProjects, names, ProjectConfiguration, Tree } from '@nrwl/devkit';
import * as path from 'path';
import { SignalIdGeneratorSchema } from './schema';

export default async function (tree: Tree, schema: SignalIdGeneratorSchema) {
  const projectName: string = 'shared-lib-util-shared-types';
  const project: ProjectConfiguration = getProjects(tree).get(projectName);
  const suffix: string = 'signal id';

  if (!project) throw new Error(`${projectName} project cannot be found`);

  schema.name = schema.name.endsWith(suffix) ? schema.name.replace(suffix, '').trim() : schema.name;

  const nameVariations = names(schema.name);
  const directory: string = `sids/${nameVariations.fileName}-signal-id`;
  const pathToFolder: string = path.join(project.sourceRoot, directory);

  const templateSubstitutions = {
    ...nameVariations,
    template: '',
  };

  generateFiles(tree, path.join(__dirname, 'files'), pathToFolder, templateSubstitutions);

  await formatFiles(tree);
}
