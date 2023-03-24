/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Tree } from '@nrwl/devkit';
import { DomainWholeEnchilladaGeneratorSchema } from './schema';

import domainModel from '../domain-model/generator';
import domainRepository from '../domain-repository/generator';
import domainEntity from '../domain-entity/generator';
import domainTransformer from '../domain-transformer/generator';

export default async function (tree: Tree, schema: DomainWholeEnchilladaGeneratorSchema) {
  // 0_domain  model
  await domainModel(tree, schema);

  // 1_application transformers
  await domainTransformer(tree, {
    name: schema.name,
    projectName: schema.projectName,
    transformerType: 'model-to-contract',
  });
  await domainTransformer(tree, {
    name: schema.name,
    projectName: schema.projectName,
    transformerType: 'contract-to-model',
  });

  // 2_infrastructure entity
  await domainEntity(tree, schema);

  // 2_infrastructure transformers
  await domainTransformer(tree, {
    name: schema.name,
    projectName: schema.projectName,
    transformerType: 'entity-to-model',
  });

  await domainRepository(tree, schema);
}
