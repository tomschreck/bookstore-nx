import { formatFiles, generateFiles, installPackagesTask, joinPathFragments, Tree } from '@nrwl/devkit';
import * as path from 'path';
import { doesFileExist, DomainSchema, generateNestJsProvider, getGeneratorMetaData, PATH_TO_SHARED_TEMPLATES_DTO } from '../base.generator';


export default async function (tree: Tree, schema: DomainSchema)
{
  // GET META DATA & PROJECT NEEDED TO GENERATE CONTENT FROM TEMPLATES
  const { templateModel, project } = getGeneratorMetaData(tree, schema);

  const directory: string = '3_use-cases';
  const fileName: string = `${templateModel.fileName}.use-case`;
  const targetPath: string = path.join(project.sourceRoot, directory);
  const targetPathDto: string = path.join(project.sourceRoot, 'shared', 'dtos');
  const pathToDtoFile: string = path.join(targetPathDto, `${templateModel.dto.fileName}.dto.ts`);

  // REGISTER USE CASE WITH NEST JS
  await generateNestJsProvider(tree, schema.projectName, fileName, directory);

  // generate folders and files from ./templates into the target path (project.sourceRoot)
  generateFiles(tree, joinPathFragments(__dirname, './templates'), targetPath, templateModel);

  if (!doesFileExist(tree, pathToDtoFile))
  {
    // generate folders and files from ./templates into the target path (project.sourceRoot)
    generateFiles(tree, PATH_TO_SHARED_TEMPLATES_DTO, targetPathDto, templateModel.dto);
  }

  await formatFiles(tree);

  return () =>
  {
    installPackagesTask(tree);
  };
}
