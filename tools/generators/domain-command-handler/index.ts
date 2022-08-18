import { formatFiles, generateFiles, installPackagesTask, joinPathFragments, Tree } from '@nrwl/devkit';
import * as path from 'path';
import { doesFileExist, DomainSchema, getGeneratorMetaData } from '../base.generator';
import domainDtoGenerator from '../domain-dto';


export default async function (tree: Tree, schema: DomainSchema)
{
  // GET META DATA & PROJECT NEEDED TO GENERATE CONTENT FROM TEMPLATES
  const { templateModel, project } = getGeneratorMetaData(tree, schema);
  const pathToFolder: string = path.join(project.sourceRoot, '1_application', 'handlers', 'command');
  const pathToFile: string = path.join(pathToFolder, `${templateModel.fileName}.handler.ts`);

  if (!doesFileExist(tree, pathToFile))
  {
    // generate folders and files from ./templates into the target path (project.sourceRoot)
    generateFiles(
      tree,
      joinPathFragments(__dirname, './templates'),
      pathToFolder,
      {
        ...templateModel.command,
        dto: { ...templateModel.dto },
        aggregate: { ...templateModel.aggregate }
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
