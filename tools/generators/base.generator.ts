import { getProjects, names, ProjectConfiguration, Tree } from '@nrwl/devkit';
import { moduleGenerator, ModuleGeneratorOptions } from '@nrwl/nest/src/generators/module/module';
import { providerGenerator, ProviderGeneratorOptions } from '@nrwl/nest/src/generators/provider/provider';

interface DomainSchema
{
  name: string;
  projectName: string;
  dtoName?: string;
  commandName?: string;
  aggregateName?: string;
  eventName?: string;
  repositoryName?: string;
}

interface GeneratorMetaData
{
  templateModel: TemplateModel;
  project: ProjectConfiguration;
  directoryFolderName?: string;
}
interface TemplateModel
{
  name: string;
  className: string;
  propertyName: string;
  constantName: string;
  fileName: string;
  tmpl?: string;
  dto?: TemplateModel;
  command?: TemplateModel;
  aggregate?: TemplateModel;
  event?: TemplateModel;
  repository?: TemplateModel;
}

function toTemplateModel(schema: DomainSchema): TemplateModel
{
  /*
    names (schema.name) generate different variations
    of 'name' property used for placeholders in templates

    names("myName") YIELDS:
    {
      name: 'myName',
      className: 'MyName',
      propertyName: 'myName',
      constantName: 'MY_NAME',
      fileName: 'my-name'
    }
  */
  schema.name = cleanNameFromSuffix(schema.name);
  schema.dtoName = cleanNameFromSuffix(schema.dtoName);
  schema.commandName = cleanNameFromSuffix(schema.commandName);
  schema.aggregateName = cleanNameFromSuffix(schema.aggregateName);
  schema.eventName = cleanNameFromSuffix(schema.eventName);
  schema.repositoryName = cleanNameFromSuffix(schema.repositoryName);

  const nameVariations = names(schema.name);
  const dtoVariations = (schema.dtoName) ? { ...names(schema.dtoName), tmpl: '' } : undefined;
  const commandVariations = (schema.commandName) ? { ...names(schema.commandName), tmpl: '' } : undefined;
  const aggregateVariations = (schema.aggregateName) ? { ...names(schema.aggregateName), tmpl: '' } : undefined;
  const eventVariations = (schema.eventName) ? { ...names(schema.eventName), tmpl: '' } : undefined;
  const repositoryVariations = (schema.repositoryName) ? { ...names(schema.repositoryName), tmpl: '' } : undefined;

  return {
    // make variations available as placeholders to be used in templates
    ...nameVariations,
    dto: dtoVariations,
    command: commandVariations,
    aggregate: aggregateVariations,
    event: eventVariations,
    repository: repositoryVariations,
    // remove __tmpl__ from file endings
    tmpl: ''
  };
};

function cleanNameFromSuffix(target: string): string
{
  if (target)
  {
    const cleanTarget: string = target.toLowerCase().trim();
    const array: string[] = [ 'aggregate', 'command', 'dto', 'entity', 'event', 'repository', 'repo', 'use case', 'usecase' ];

    for (let index = 0; index < array.length; index++)
    {
      const cleanSuffix: string = array[ index ].toLowerCase().trim();

      if (cleanTarget.endsWith(cleanSuffix))
      {
        return target.replace(new RegExp(cleanSuffix, 'gi'), '').trim();
      }
    }
  }

  return target;
}


function getProject(tree: Tree, projectName: string): ProjectConfiguration
{
  return getProjects(tree).get(projectName);
}

function getGeneratorMetaData(tree: Tree, schema: DomainSchema): GeneratorMetaData
{
  const generatorMetaData: GeneratorMetaData = {
    templateModel: toTemplateModel(schema),
    project: getProject(tree, schema.projectName)
  };

  return generatorMetaData;
};

function doesFileExist(tree: Tree, pathToFile: string): boolean
{
  const doesExist: boolean = tree.exists(pathToFile);

  if (doesExist)
  {
    console.log('');
    console.log('------------------------------------------------------------------------------------------------------------');
    console.error(`!!! WARNING !!!   Can NOT generate '${pathToFile}'
    \n because it either already exists in codebase or has been added to tree to be generated.`);
    console.log('------------------------------------------------------------------------------------------------------------');
    console.log('');
  }

  return doesExist;
}

async function generateNestJsModule(tree: Tree, projectName: string, filename: string, directory?: string)
{
  // CREATE NEST JS ROOT MODULE
  const rawOptions: ModuleGeneratorOptions = {
    project: projectName,
    name: filename,
    directory: directory,
    flat: true
  };

  await moduleGenerator(tree, rawOptions);
}

async function generateNestJsProvider(tree: Tree, projectName: string, filename: string, directory?: string)
{
  const rawOptions: ProviderGeneratorOptions = {
    project: projectName,
    name: filename,
    directory: directory,
    flat: true,
    unitTestRunner: 'none'
  };

  await providerGenerator(tree, rawOptions);
}


export
{
  DomainSchema,
  TemplateModel,
  getGeneratorMetaData,
  generateNestJsModule,
  generateNestJsProvider,
  doesFileExist
};
