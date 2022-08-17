import { formatFiles, generateFiles, installPackagesTask, joinPathFragments, Tree } from '@nrwl/devkit';
import * as path from 'path';
import { doesFileExist, DomainSchema, getGeneratorMetaData, PATH_TO_SHARED_TEMPLATES_DTO } from '../base.generator';


export default async function (tree: Tree, schema: DomainSchema)
{
  console.log('AGGREGATE BEFORE', schema);
  // GET META DATA & PROJECT NEEDED TO GENERATE CONTENT FROM TEMPLATES
  const { templateModel, project } = getGeneratorMetaData(tree, schema);

  console.log('AGGREGATE AFTER', templateModel);


  const targetPath: string = path.join(project.sourceRoot, '0_domain');
  const targetPathDto: string = path.join(project.sourceRoot, 'shared', 'dtos');
  const pathToAggregateFile: string = path.join(targetPath, `${templateModel.fileName}.aggregate.ts`);
  const pathToDtoFile: string = path.join(targetPathDto, `${templateModel.fileName}.dto.ts`);

  if (!doesFileExist(tree, pathToAggregateFile))
  {
    // generate folders and files from ./templates into the target path (project.sourceRoot)
    generateFiles(tree, joinPathFragments(__dirname, './templates'), targetPath, templateModel);
  }

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
