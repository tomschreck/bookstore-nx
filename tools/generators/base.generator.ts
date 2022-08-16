import { getProjects, joinPathFragments, names, ProjectConfiguration, Tree } from '@nrwl/devkit';


interface GeneratorMetaData
{
  substitutions: Substitutions;
  project: ProjectConfiguration;
  directoryFolderName?: string;
}

interface Substitutions
{
  name: string;
  className: string;
  propertyName: string;
  constantName: string;
  fileName: string;
  tmpl?: string;
}

function toSubstitutions(input: string): Substitutions
{
  /*
    names (schema.name) generate different variations
    of 'name' property used for substitutions in templates

    names("myName") YIELDS:
    {
      name: 'myName',
      className: 'MyName',
      propertyName: 'myName',
      constantName: 'MY_NAME',
      fileName: 'my-name'
    }
  */
  const nameVariations = names(input);

  return {
    // make variations available as substitutions to be used in templates
    ...nameVariations,
    // remove __tmpl__ from file endings
    tmpl: ''
  };
};

function getProject(tree: Tree, projectName: string): ProjectConfiguration
{
  return getProjects(tree).get(projectName);
}

export function getGeneratorMetaData(tree: Tree, name: string, projectName: string): GeneratorMetaData
{
  const generatorMetaData: GeneratorMetaData = {
    substitutions: toSubstitutions(name),
    project: getProject(tree, projectName)
  };

  return generatorMetaData;
};

export function doesFileExist(tree: Tree, pathToFile: string): boolean
{
  const doesExist: boolean = tree.exists(pathToFile);

  if (doesExist)
  {
    console.log('');
    console.log('---------------------------------------------------------------------------------');
    console.error(`!!! WARNING !!!   Can NOT generate '${pathToFile}' because file already exists.`);
    console.log('---------------------------------------------------------------------------------');
    console.log('');
  }

  return doesExist;
}

export const PATH_TO_SHARED_TEMPLATES_DTO: string = joinPathFragments(__dirname, 'shared-templates', 'templates_dto');
