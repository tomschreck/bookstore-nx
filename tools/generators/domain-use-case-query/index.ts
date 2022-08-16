import { formatFiles, generateFiles, installPackagesTask, joinPathFragments, names, Tree } from '@nrwl/devkit';
import * as path from 'path';
import { doesFileExist, getGeneratorMetaData, PATH_TO_SHARED_TEMPLATES_DTO, Substitutions } from '../base.generator';

interface DomainUseCaseSchema
{
  name: string;
  dtoName: string;
  projectName: string;
}

interface SubstitutionsUseCase extends Substitutions
{
  dtoName: string;
  dtoPropertyName: string;
  dtoFileName: string;
}

export default async function (tree: Tree, schema: DomainUseCaseSchema)
{
  // GET META DATA & PROJECT NEEDED TO GENERATE CONTENT FROM TEMPLATES
  const { substitutions, project } = getGeneratorMetaData(tree, schema.name, schema.projectName);
  const dtoNameVariations = names(schema.dtoName);

  const substitutionsExtended: SubstitutionsUseCase = {
    ...substitutions,
    dtoName: dtoNameVariations.name,
    dtoPropertyName: dtoNameVariations.propertyName,
    dtoFileName: dtoNameVariations.fileName
  };

  console.log('substitutionsExtended', substitutionsExtended);

  const targetPath: string = path.join(project.sourceRoot, '3_use-cases');
  const targetPathDto: string = path.join(project.sourceRoot, 'shared', 'dtos');
  const pathToUseCaseFile: string = path.join(targetPath, `${substitutionsExtended.fileName}.use-case.ts`);
  const pathToDtoFile: string = path.join(targetPathDto, `${substitutionsExtended.dtoFileName}.dto.ts`);

  if (!doesFileExist(tree, pathToUseCaseFile))
  {
    // generate folders and files from ./templates into the target path (project.sourceRoot)
    generateFiles(tree, joinPathFragments(__dirname, './templates'), targetPath, substitutionsExtended);
  }

  if (!doesFileExist(tree, pathToDtoFile))
  {
    const substitutionsDto: SubstitutionsUseCase = {
      ...substitutionsExtended,
      fileName: substitutionsExtended.dtoFileName
    };

    // generate folders and files from ./templates into the target path (project.sourceRoot)
    generateFiles(tree, PATH_TO_SHARED_TEMPLATES_DTO, targetPathDto, substitutionsDto);
  }

  await formatFiles(tree);

  return () =>
  {
    installPackagesTask(tree);
  };
}
