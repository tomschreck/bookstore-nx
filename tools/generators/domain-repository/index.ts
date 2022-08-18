import { formatFiles, generateFiles, installPackagesTask, joinPathFragments, Tree } from '@nrwl/devkit';
import * as path from 'path';
import { doesFileExist, DomainSchema, generateNestJsProvider, getGeneratorMetaData } from '../base.generator';


export default async function (tree: Tree, schema: DomainSchema)
{
  // GET META DATA & PROJECT NEEDED TO GENERATE CONTENT FROM TEMPLATES
  const { templateModel, project } = getGeneratorMetaData(tree, schema);
  const directory: string = '2_infrastructure';
  const fileName: string = `${templateModel.fileName}.repository`;
  const pathToFolder: string = path.join(project.sourceRoot, directory);
  const pathToFile: string = path.join(pathToFolder, fileName);

  if (!doesFileExist(tree, pathToFile))
  {
    // REGISTER REPOSITORY WITH NEST JS MODULE
    await generateNestJsProvider(tree, schema.projectName, fileName, directory);

    // generate folders and files from ./templates into the target path (project.sourceRoot)
    generateFiles(
      tree,
      joinPathFragments(__dirname, './templates'),
      pathToFolder,
      {
        ...templateModel.repository,
        dto: { ...templateModel.dto }
      }
    );
  }

  await formatFiles(tree);

  return () =>
  {
    installPackagesTask(tree);
  };
}
