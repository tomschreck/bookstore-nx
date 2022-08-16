import { formatFiles, generateFiles, getProjects, installPackagesTask, joinPathFragments, names, ProjectConfiguration, Tree } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';
import { Schema } from '@nrwl/workspace/src/generators/library/schema';

interface DomainSchema
{
  name: string;
}

export default async function (tree: Tree, schema: DomainSchema)
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
  const nameVariations = names(schema.name);
  const DIRECTORY: string = 'domains';

  const domainSchema: Schema = {
    name: schema.name,
    directory: DIRECTORY,
    standaloneConfig: true
  };

  await libraryGenerator(tree, domainSchema);

  const substitutions =
  {
    // remove __tmpl__ from file endings
    tmpl: '',
    // make variations available as substitutions to be used in templates
    ...nameVariations
  };

  const project: ProjectConfiguration = getProjects(tree).get(`${DIRECTORY}-${substitutions.fileName}`);

  // console.log('substitutions', substitutions);
  // console.log('project', project);

  // generate folders and files from ./templates into the target path (project.sourceRoot)
  generateFiles(
    tree,
    joinPathFragments(__dirname, './templates'),
    project.sourceRoot,
    substitutions
  );

  // CLEANUP: delete the lib folder automatically generated by libraryGenerator above as it's not needed
  tree.delete(`${project.sourceRoot}/lib`);

  await formatFiles(tree);

  return () =>
  {
    installPackagesTask(tree);
  };
}
