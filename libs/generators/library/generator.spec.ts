import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration, ProjectConfiguration } from '@nrwl/devkit';
import { expect } from 'chai';

import generator from './generator';
import { LibraryGeneratorSchema } from './schema';

describe('library generator', () => {
  let appTree: Tree;
  let config: ProjectConfiguration;

  const options: LibraryGeneratorSchema = {
    type: 'lib-util',
    scope: 'shared',
    framework: 'node',
    domain: 'advisor-portal',
    name: 'test',
  };
  //config_name = shared-advisor-portal-util-test
  const config_name: string = `${options.scope}-${options.type}-${options.name}`;

  beforeAll(async () => {
    appTree = createTreeWithEmptyWorkspace();

    await generator(appTree, options);

    config = await readProjectConfiguration(appTree, config_name);
  });

  it('should run successfully', () => {
    expect(config).to.not.be.null;
  });

  it(`should have 'shared-advisor-portal-util-test' for config name`, () => {
    expect(config.name).to.equal(config_name);
  });

  it('should have 4 tags', () => {
    expect(config.tags.length).to.equal(4);
    expect(config.tags[0]).to.equal('scope:shared');
    expect(config.tags[1]).to.equal('type:lib-util');
    expect(config.tags[2]).to.equal('framework:node');
    expect(config.tags[3]).to.equal('domain:advisor-portal');
  });
});
