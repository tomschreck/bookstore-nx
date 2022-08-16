import { formatFiles, generateFiles, installPackagesTask, joinPathFragments, Tree } from '@nrwl/devkit';
import * as path from 'path';
import getGeneratorMetaData from '../base.generator';
interface DomainAggregateSchema
{
  name: string;
  projectName: string;
}

export default async function (tree: Tree, schema: DomainAggregateSchema)
{
  // GET META DATA & PROJECT NEEDED TO GENERATE CONTENT FROM TEMPLATES
  const { substitutions, project } = getGeneratorMetaData(tree, schema.name, schema.projectName);
  const targetPath: string = path.join(project.sourceRoot, '0_domain');
  const targetPathDto: string = path.join(project.sourceRoot, 'shared', 'dtos');

  // generate folders and files from ./templates into the target path (project.sourceRoot)
  generateFiles(tree, joinPathFragments(__dirname, './templates'), targetPath, substitutions);
  generateFiles(tree, joinPathFragments(__dirname, './templates_dto'), targetPathDto, substitutions);

  await formatFiles(tree);

  return () =>
  {
    installPackagesTask(tree);
  };
}
