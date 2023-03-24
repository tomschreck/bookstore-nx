import { formatFiles, getProjects, ProjectConfiguration, Tree, readJsonFile, updateJson, updateProjectConfiguration } from '@nrwl/devkit';
import { getTagsFromProjects, ITagsFromProjects } from './project-utils';

interface Schema {
  schemaPath: string;
  interfacePath: string;
  interfaceName: string;
  blockList?: {
    scope?: string[];
  };
}

const schemaCollection: Schema[] = [
  {
    schemaPath: 'libs/internal-plugins/src/generators/application/schema.json',
    interfacePath: 'libs/internal-plugins/src/generators/application/schema.d.ts',
    interfaceName: 'ApplicationGeneratorSchema',
    blockList: {
      scope: ['core', 'domain', 'shared'],
    },
  },
  {
    schemaPath: 'libs/internal-plugins/src/generators/library/schema.json',
    interfacePath: 'libs/internal-plugins/src/generators/library/schema.d.ts',
    interfaceName: 'LibraryGeneratorSchema',
    blockList: {
      scope: ['api', 'other'],
    },
  },
];

export default async function (tree: Tree) {
  const projects: Map<string, ProjectConfiguration> = getProjects(tree);
  const tagsFromProjects: ITagsFromProjects = getTagsFromProjects(projects);

  addScopeIfMissing(tree, projects);

  schemaCollection.forEach((item: Schema) => {
    doIt(tree, item, tagsFromProjects);
  });

  await formatFiles(tree);
}

function addScopeIfMissing(tree: Tree, projects: Map<string, ProjectConfiguration>): void {
  Array.from(projects.keys()).forEach((projectName) => {
    const project: ProjectConfiguration = projects.get(projectName);

    if (!project.tags.some((tag) => tag.startsWith('scope:'))) {
      const scope = projectName.split('-')[0];

      project.tags.push(`scope:${scope}`);

      updateProjectConfiguration(tree, projectName, project);
    }
  });
}

function doIt(tree: Tree, schema: Schema, tagsFromProjects: ITagsFromProjects) {
  const uniqueScopeItems: string[] = combineValuesToUniqueList(schema, 'scope', tagsFromProjects.scopes);
  const uniqueTypeItems: string[] = combineValuesToUniqueList(schema, 'type', null);
  const uniqueFrameworkItems: string[] = combineValuesToUniqueList(schema, 'framework', tagsFromProjects.frameworks);
  const uniqueDomainItems: string[] = combineValuesToUniqueList(schema, 'domain', tagsFromProjects.domains);

  // console.log('DAS TAGS', tagsFromProjects);
  // console.log('DAS SCOPES', uniqueScopeItems);
  // console.log('DAS TYPES', uniqueTypeItems);
  // console.log('DAS FRAMEWORKS', uniqueFrameworkItems);
  // console.log('DAS DOMAINS', uniqueDomainItems);
  // console.log('');
  // console.log('');
  // console.log(
  //   '_______________________________________________________________________'
  // );

  updateSchemaFile(tree, schema.schemaPath, uniqueScopeItems, uniqueTypeItems, uniqueFrameworkItems, uniqueDomainItems);
  updateInterfaceFile(tree, schema.interfacePath, schema.interfaceName, uniqueScopeItems, uniqueTypeItems, uniqueFrameworkItems, uniqueDomainItems);
}

function combineValuesToUniqueList(schema: Schema, property: string, tags: string[]): string[] {
  const schemaJson = readJsonFile(schema.schemaPath);

  //COMBINE EXISTING ITEMS WITH INCOMING SCOPES
  if (schemaJson.properties[property] && schemaJson.properties[property]['x-prompt'] && schemaJson.properties[property]['x-prompt'].items) {
    const combinedNames: string[] =
      tags && tags.length > 0 ? [...schemaJson.properties[property]['x-prompt'].items, ...tags] : [...schemaJson.properties[property]['x-prompt'].items];

    let uniqueNames: string[] = Array.from(new Set(combinedNames));

    if (schema.blockList && schema.blockList[property] && schema.blockList[property].length > 0) {
      const namesToDeleteSet = new Set(schema.blockList[property]);
      uniqueNames = uniqueNames.filter((name) => !namesToDeleteSet.has(name));
    }

    return uniqueNames.sort();
  }

  return [];
}

function updateSchemaFile(tree: Tree, schemaPath: string, scopeItems: string[], typeItems: string[], frameworkItems: string[], domainItems: string[]): void {
  updateJson(tree, schemaPath, (schemaJson) => {
    if (scopeItems && scopeItems.length > 0) {
      schemaJson.properties.scope['x-prompt'].items = [...scopeItems];
    }

    if (typeItems && typeItems.length > 0) {
      schemaJson.properties.type['x-prompt'].items = [...typeItems];
    }

    if (frameworkItems && frameworkItems.length > 0) {
      schemaJson.properties.framework['x-prompt'].items = [...frameworkItems];
    }

    if (domainItems && domainItems.length > 0) {
      schemaJson.properties.domain['x-prompt'].items = [...domainItems];
    }

    return schemaJson;
  });
}

function updateInterfaceFile(
  tree: Tree,
  interfacePath: string,
  interfaceName: string,
  scopeItems: string[],
  typeItems: string[],
  frameworkItems: string[],
  domainItems: string[]
): void {
  // console.log('********* UPDATE INTERFACE FILE');
  // console.log('type:', typeItems);
  // console.log('scope:', scopeItems);
  // console.log('framework:', frameworkItems);
  // console.log('domain:', domainItems);

  const updatedInterface: string = `export interface ${interfaceName} {
    scope: ${toEnum(scopeItems)};
    scopeOther?: string;
    type: ${toEnum(typeItems)};
    framework: ${toEnum(frameworkItems)};
    domain?: ${toEnum(domainItems)};
    name: string;
  }`;

  tree.write(interfacePath, updatedInterface);
}

function toEnum(items: string[]): string {
  return items && items.length > 0 ? items.map((s) => `'${s}'`).join(' | ') : '';
}
