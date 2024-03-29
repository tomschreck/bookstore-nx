import {
  formatFiles,
  generateFiles,
  installPackagesTask,
  names,
  offsetFromRoot,
  ProjectConfiguration,
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nrwl/devkit';
import { NormalizedSchema } from '../generator';
import { applicationGenerator } from '@nrwl/node/src/generators/application/application';
import { addDeployTargets, cleanupBuildTarget, getDirectory, getTags } from './util';
import * as path from 'path';
import { Linter } from '@nrwl/linter';

export default async function (tree: Tree, normalizedSchema: NormalizedSchema) {
  await applicationGenerator(tree, {
    name: normalizedSchema.name,
    directory: getDirectory(normalizedSchema),
    tags: getTags(normalizedSchema),
    skipFormat: false,
    linter: Linter.EsLint,
    standaloneConfig: true,
  });

  addFiles();

  await formatFiles(tree);

  const projectConfig: ProjectConfiguration = readProjectConfiguration(tree, normalizedSchema.projectName);

  cleanupUnUsedFolders();
  cleanupBuildTarget(projectConfig);
  addDeployTargets(projectConfig, normalizedSchema);
  updateProjectConfiguration(tree, normalizedSchema.projectName, projectConfig);

  return () => {
    installPackagesTask(tree);
  };

  function addFiles() {
    const pathToFiles: string = '../files/workflow';
    const namesDerivatives = names(normalizedSchema.name);

    const templateOptions = {
      ...normalizedSchema,
      ...namesDerivatives,
      offsetFromRoot: offsetFromRoot(normalizedSchema.projectRoot),
      gcpName: namesDerivatives.fileName.replace(new RegExp('-', 'g'), '_'),
      template: '',
    };

    // console.log('pathToFiles', pathToFiles);
    // console.log('path', path.join(__dirname, pathToFiles));
    // console.log('templateOptions', templateOptions);

    generateFiles(tree, path.join(__dirname, pathToFiles), normalizedSchema.projectRoot, templateOptions);
  }

  function cleanupUnUsedFolders() {
    // CLEANUP: delete the app folder automatically generated by applicationGenerator above as it's not needed
    tree.delete(`${normalizedSchema.projectRoot}/src`);
  }
}
