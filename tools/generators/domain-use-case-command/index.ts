import { formatFiles, generateFiles, installPackagesTask, joinPathFragments, Tree } from '@nrwl/devkit';
import * as path from 'path';
import { doesFileExist, DomainSchema, generateNestJsProvider, getGeneratorMetaData } from '../base.generator';

import domainAggregateGenerator from '../domain-aggregate';
import domainCommandGenerator from '../domain-command';
import domainCommandHandlerGenerator from '../domain-command-handler';
import domainDtoGenerator from '../domain-dto';
import domainEventGenerator from '../domain-event';
import domainEventHandlerGenerator from '../domain-event-handler';
import domainRepositoryGenerator from '../domain-repository';

/*
COMMAND USE CASE:

use case
|- Dto
|- Command
|- Command Handler
|- Aggregate
|- Event
|- Event Handler
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
    generateFiles(
      tree,
      joinPathFragments(__dirname, './templates'),
      pathToFolder,
      templateModel
    );
  }

  // GENERATE ARCHITECTURE LAYERS...
  await domainDtoGenerator(tree, schema);
  await domainCommandGenerator(tree, schema);
  await domainCommandHandlerGenerator(tree, schema);
  await domainAggregateGenerator(tree, schema);
  await domainEventGenerator(tree, schema);
  await domainEventHandlerGenerator(tree, schema);
  await domainRepositoryGenerator(tree, schema);

  await formatFiles(tree);

  return () =>
  {
    installPackagesTask(tree);
  };
}
