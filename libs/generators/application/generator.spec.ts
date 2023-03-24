import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration, names } from '@nrwl/devkit';

import generator from './generator';
import { ApplicationGeneratorSchema } from './schema';

describe('application generator', () => {
  let appTree: Tree;
  const options: ApplicationGeneratorSchema = {
    scope: 'advisor-portal',
    type: 'app',
    framework: 'nest',
    name: 'test',
  };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await generator(appTree, options);

    const nameVariations = { ...names(options.name), tmpl: '' };
    const directory: string = `${options.scope}/${options.type}`;
    const projectName: string = `${directory}/${nameVariations.fileName}`.replace(new RegExp('/', 'g'), '-');
    const config = readProjectConfiguration(appTree, projectName);
    expect(config).toBeDefined();
  });
});
