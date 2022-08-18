import { formatFiles, generateFiles, installPackagesTask, joinPathFragments, Tree } from '@nrwl/devkit';
import * as path from 'path';
import { doesFileExist, DomainSchema, generateNestJsProvider, getGeneratorMetaData } from '../base.generator';

import domainDtoGenerator from '../domain-dto';
import domainRepositoryGenerator from '../domain-repository';

/*
QUERY USE CASE:

use case
|- Dto
|_ Repository

 */

export default async function (tree: Tree, schema: DomainSchema)
{
  // GET META DATA & PROJECT NEEDED TO GENERATE CONTENT FROM TEMPLATES
  const { templateModel, project } = getGeneratorMetaData(tree, schema);
  const directory: string = '3_use-cases';
  const fileName: string = `${templateModel.fileName}.use-case`;
  const pathToFolder: string = path.join(project.sourceRoot, directory);
  const pathToFile: string = path.join(pathToFolder, fileName);

  if (!doesFileExist(tree, pathToFile))
  {
    // REGISTER USE CASE WITH NEST JS MODULE
    await generateNestJsProvider(tree, schema.projectName, fileName, directory);

    // generate folders and files from ./templates into the target path (project.sourceRoot)
    generateFiles(tree, joinPathFragments(__dirname, './templates'), pathToFolder, templateModel);
  }

  // GENERATE ARCHITECTURE LAYERS...
  await domainDtoGenerator(tree, schema);
  await domainRepositoryGenerator(tree, schema);

  await formatFiles(tree);

  return () =>
  {
    installPackagesTask(tree);
  };
}
