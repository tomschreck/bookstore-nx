import { formatFiles, generateFiles, installPackagesTask, joinPathFragments, Tree } from '@nrwl/devkit';
import * as path from 'path';
import { doesFileExist, DomainSchema, getGeneratorMetaData } from '../base.generator';
import domainDtoGenerator from '../domain-dto';


export default async function (tree: Tree, schema: DomainSchema)
{
  // GET META DATA & PROJECT NEEDED TO GENERATE CONTENT FROM TEMPLATES
  const { templateModel, project } = getGeneratorMetaData(tree, schema);
  const pathToFolder: string = path.join(project.sourceRoot, '1_application', 'commands');
  const pathToFile: string = path.join(pathToFolder, `${templateModel.fileName}.command.ts`);

  if (!doesFileExist(tree, pathToFile))
  {
    // generate folders and files from ./templates into the target path (project.sourceRoot)
    generateFiles(
      tree,
      joinPathFragments(__dirname, './templates'),
      pathToFolder,
      {
        ...templateModel.command,
        dto: { ...templateModel.dto }
      }
    );
  }

  // GENERATE DTO...
  domainDtoGenerator(tree, schema);

  await formatFiles(tree);

  return () =>
  {
    installPackagesTask(tree);
  };
}
