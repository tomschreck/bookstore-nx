/* eslint-disable @typescript-eslint/no-inferrable-types */
import { formatFiles, generateFiles, getProjects, names, ProjectConfiguration, Tree } from '@nrwl/devkit';
import * as path from 'path';
import { DomainRepositoryGeneratorSchema } from './schema';
import { providerGenerator, ProviderGeneratorOptions } from '@nrwl/nest/src/generators/provider/provider';

export default async function (tree: Tree, schema: DomainRepositoryGeneratorSchema) {
  const project: ProjectConfiguration = getProjects(tree).get(schema.projectName);

  if (!project) throw new Error(`${schema.projectName} project cannot be found`);

  const nameVariations = names(schema.name);
  const directory: string = `2_infrastructure/repositories/${nameVariations.fileName}`;
  const fileName: string = `${nameVariations.fileName}.repository`;
  const pathToFolder: string = path.join(project.sourceRoot, directory);

  // REGISTER USE CASE WITH NEST JS MODULE (creates dummy provider which gets overwritten by generateFiles below..)
  await generateNestJsProvider(tree, schema.projectName, directory, fileName);

  const templateSubstitutions = {
    ...nameVariations,
    template: '',
  };

  generateFiles(tree, path.join(__dirname, 'files'), pathToFolder, templateSubstitutions);

  await formatFiles(tree);
}

async function generateNestJsProvider(tree: Tree, projectName: string, directory: string, filename: string) {
  const rawOptions: ProviderGeneratorOptions = {
    project: projectName,
    directory: directory,
    name: filename,
    flat: true,
    unitTestRunner: 'jest',
  };

  await providerGenerator(tree, rawOptions);
}
