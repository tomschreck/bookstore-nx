/* eslint-disable @typescript-eslint/no-inferrable-types */
import { formatFiles, generateFiles, getProjects, names, ProjectConfiguration, Tree } from '@nrwl/devkit';
import providerGenerator, { ProviderGeneratorOptions } from '@nrwl/nest/src/generators/provider/provider';
import * as path from 'path';
import { DomainTransformerGeneratorSchema } from './schema';

export default async function (tree: Tree, schema: DomainTransformerGeneratorSchema) {
  const project: ProjectConfiguration = getProjects(tree).get(schema.projectName);

  if (!project) throw new Error(`${schema.projectName} project cannot be found`);

  const schemaNameVariations = names(schema.name);
  const transformerFileName: string = `${schema.name}-${schema.transformerType}`;
  const nameVariations = names(transformerFileName);
  const folderContext: string = schema.transformerType === 'entity-to-model' ? '2_infrastructure' : '1_application';
  const directory: string = `${folderContext}/transformers/${schemaNameVariations.fileName}`;
  const fileName: string = `${nameVariations.fileName}.transformer`;
  const pathToFolder: string = path.join(project.sourceRoot, directory);

  // REGISTER USE CASE WITH NEST JS MODULE (creates dummy provider which gets overwritten by generateFiles below..)
  await generateNestJsProvider(tree, schema.projectName, directory, fileName);

  const templateSubstitutions = {
    ...nameVariations,
    modelName: names(schema.name).className,
    entityName: names(schema.name).className,
    template: '',
  };

  generateFiles(tree, path.join(__dirname, `files/${schema.transformerType}`), pathToFolder, templateSubstitutions);

  await formatFiles(tree);
}

async function generateNestJsProvider(tree: Tree, projectName: string, directory: string, filename: string) {
  const rawOptions: ProviderGeneratorOptions = {
    project: projectName,
    directory: directory,
    name: filename,
    flat: true,
    unitTestRunner: 'none',
  };

  await providerGenerator(tree, rawOptions);
}
