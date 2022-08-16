import { formatFiles, generateFiles, installPackagesTask, joinPathFragments, Tree } from '@nrwl/devkit';
import * as path from 'path';
import { doesFileExist, DtoSubstitutions, getGeneratorMetaData, PATH_TO_SHARED_TEMPLATES_DTO, toDtoSubstitutions } from '../base.generator';

interface DomainUseCaseCommandSchema
{
  name: string;
  dtoName: string;
  projectName: string;
}


export default async function (tree: Tree, schema: DomainUseCaseCommandSchema)
{
  // GET META DATA & PROJECT NEEDED TO GENERATE CONTENT FROM TEMPLATES
  const { substitutions, project } = getGeneratorMetaData(tree, schema.name, schema.projectName);
  let dtoSubstitutions: DtoSubstitutions = toDtoSubstitutions(substitutions, schema.dtoName);

  const targetPath: string = path.join(project.sourceRoot, '3_use-cases');
  const targetPathDto: string = path.join(project.sourceRoot, 'shared', 'dtos');
  const pathToUseCaseFile: string = path.join(targetPath, `${dtoSubstitutions.fileName}.use-case.ts`);
  const pathToDtoFile: string = path.join(targetPathDto, `${dtoSubstitutions.dto.fileName}.dto.ts`);

  if (!doesFileExist(tree, pathToUseCaseFile))
  {
    // generate folders and files from ./templates into the target path (project.sourceRoot)
    generateFiles(tree, joinPathFragments(__dirname, './templates'), targetPath, dtoSubstitutions);
  }

  if (!doesFileExist(tree, pathToDtoFile))
  {
    // generate folders and files from ./templates into the target path (project.sourceRoot)
    generateFiles(tree, PATH_TO_SHARED_TEMPLATES_DTO, targetPathDto, dtoSubstitutions.dto);
  }

  await formatFiles(tree);

  return () =>
  {
    installPackagesTask(tree);
  };
}
