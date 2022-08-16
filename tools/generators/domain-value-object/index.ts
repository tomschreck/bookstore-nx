import { formatFiles, generateFiles, installPackagesTask, joinPathFragments, Tree } from '@nrwl/devkit';
import * as path from 'path';
import { doesFileExist, getGeneratorMetaData } from '../base.generator';

interface DomainValueObjectSchema
{
  name: string;
  projectName: string;
}

export default async function (tree: Tree, schema: DomainValueObjectSchema)
{
  // GET META DATA & PROJECT NEEDED TO GENERATE CONTENT FROM TEMPLATES
  const { substitutions, project } = getGeneratorMetaData(tree, schema.name, schema.projectName);
  const targetPath: string = path.join(project.sourceRoot, '0_domain');
  const pathToValueObjectFile: string = path.join(targetPath, `${substitutions.fileName}.vo.ts`);

  if (!doesFileExist(tree, pathToValueObjectFile))
  {
    // generate folders and files from ./templates into the target path (project.sourceRoot)
    generateFiles(tree, joinPathFragments(__dirname, './templates'), targetPath, substitutions);
  }

  await formatFiles(tree);

  return () =>
  {
    installPackagesTask(tree);
  };
}
