import { formatFiles, generateFiles, installPackagesTask, joinPathFragments, Tree } from '@nrwl/devkit';
import * as path from 'path';
import { doesFileExist, DomainSchema, generateNestJsProvider, getGeneratorMetaData } from '../base.generator';


import domainAggregateGenerator from '../domain-aggregate';
import domainCommandGenerator from '../domain-command';
import domainCommandHandlerGenerator, { DomainCommandHandlerSchema } from '../domain-command-handler';
import domainDtoGenerator from '../domain-dto';
import domainEventGenerator from '../domain-event';
import domainEventHandlerGenerator from '../domain-event-handler';

/*
COMMAND USE CASE:

use case
|- Command
|- Command Handler
|- Aggregate
|- Event
|_ Event Handler

 */
interface DomainUseCaseSchema extends DomainSchema
{
  commandName: string;
  aggregateName: string;
  eventName: string;
}

export default async function (tree: Tree, schema: DomainUseCaseSchema)
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
  generateDto(tree, schema);
  generateCommand(tree, schema);
  generateCommandHandler(tree, schema);
  generateAggregate(tree, schema);
  generateEvent(tree, schema);
  generateEventHandler(tree, schema);


  await formatFiles(tree);

  return () =>
  {
    installPackagesTask(tree);
  };
}


function generateDto(tree: Tree, schema: DomainUseCaseSchema)
{
  domainDtoGenerator(tree, schema);
}
function generateCommand(tree: Tree, schema: DomainUseCaseSchema)
{
  const domainSchema: DomainSchema = {
    name: schema.commandName,
    projectName: schema.projectName,
    dtoName: schema.dtoName
  };
  domainCommandGenerator(tree, domainSchema);
}
function generateCommandHandler(tree: Tree, schema: DomainUseCaseSchema)
{
  const domainSchema: DomainCommandHandlerSchema = {
    name: schema.commandName,
    projectName: schema.projectName,
    dtoName: schema.dtoName,
    aggregateName: schema.aggregateName,
  };
  domainCommandHandlerGenerator(tree, domainSchema);
}
function generateAggregate(tree: Tree, schema: DomainUseCaseSchema)
{
  const domainSchema: DomainSchema = {
    name: schema.aggregateName,
    projectName: schema.projectName,
    dtoName: schema.dtoName
  };
  domainAggregateGenerator(tree, domainSchema);
}
function generateEvent(tree: Tree, schema: DomainUseCaseSchema)
{
  const domainSchema: DomainSchema = {
    name: schema.eventName,
    projectName: schema.projectName,
    dtoName: schema.dtoName
  };

  domainEventGenerator(tree, domainSchema);
}
function generateEventHandler(tree: Tree, schema: DomainUseCaseSchema)
{
  const domainSchema: DomainSchema = {
    name: schema.eventName,
    projectName: schema.projectName,
    dtoName: schema.dtoName
  };
  domainEventHandlerGenerator(tree, domainSchema);
}
