import { formatFiles, generateFiles, installPackagesTask, joinPathFragments, Tree } from '@nrwl/devkit';
import * as path from 'path';
import { doesFileExist, getGeneratorMetaData, PATH_TO_SHARED_TEMPLATES_DTO } from '../base.generator';

interface DomainEntitySchema
{
  name: string;
  projectName: string;
}

export default async function (tree: Tree, schema: DomainEntitySchema)
{
  // GET META DATA & PROJECT NEEDED TO GENERATE CONTENT FROM TEMPLATES
  const { substitutions, project } = getGeneratorMetaData(tree, schema.name, schema.projectName);
  const targetPath: string = path.join(project.sourceRoot, '0_domain');
  const targetPathDto: string = path.join(project.sourceRoot, 'shared', 'dtos');
  const pathToEntityFile: string = path.join(targetPath, `${substitutions.fileName}.entity.ts`);
  const pathToDtoFile: string = path.join(targetPathDto, `${substitutions.fileName}.dto.ts`);

  if (!doesFileExist(tree, pathToEntityFile))
  {
    // generate folders and files from ./templates into the target path (project.sourceRoot)
    generateFiles(tree, joinPathFragments(__dirname, './templates'), targetPath, substitutions);
  }

  if (!doesFileExist(tree, pathToDtoFile))
  {
    // generate folders and files from ./templates into the target path (project.sourceRoot)
    generateFiles(tree, PATH_TO_SHARED_TEMPLATES_DTO, targetPathDto, substitutions);
  }

  await formatFiles(tree);

  return () =>
  {
    installPackagesTask(tree);
  };
}
