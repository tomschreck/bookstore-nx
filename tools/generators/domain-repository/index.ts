import { formatFiles, generateFiles, installPackagesTask, joinPathFragments, Tree } from '@nrwl/devkit';
import * as path from 'path';
import { doesFileExist, DomainSchema, generateNestJsProvider, getGeneratorMetaData } from '../base.generator';
import domainDtoGenerator from '../domain-dto';


export default async function (tree: Tree, schema: DomainSchema)
{
  // GET META DATA & PROJECT NEEDED TO GENERATE CONTENT FROM TEMPLATES
  const { templateModel, project } = getGeneratorMetaData(tree, schema);
  const directory: string = path.join('2_infrastructure', 'repos');
  const fileName: string = `${templateModel.repository.fileName}.repository`;
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

  // GENERATE DTO...
  await domainDtoGenerator(tree, schema);

  await formatFiles(tree);

  return () =>
  {
    installPackagesTask(tree);
  };
}
