import { ProjectConfiguration } from '@nrwl/devkit';

interface ITagsFromProjects {
  scopes: string[];
  frameworks: string[];
  domains: string[];
}

function getTagsFromProjects(
  projectMap: Map<string, ProjectConfiguration>
): ITagsFromProjects {
  const projects: ProjectConfiguration[] = Array.from(projectMap.values());
  const scopes: string[] = getTagsByPrefix(projects, 'scope:');
  const frameworks: string[] = getTagsByPrefix(projects, 'framework:');
  const domains: string[] = getTagsByPrefix(projects, 'domain:');

  return {
    scopes,
    frameworks,
    domains,
  };

  function getTagsByPrefix(projects: ProjectConfiguration[], prefix: string) {
    const prefixLength: number = prefix.length;

    const allScopes: string[] = projects
      // take only those that starts with passed in prefix
      .map((project) =>
        project.tags.filter((tag: string) => tag.startsWith(prefix))
      )
      // flatten the array
      .reduce((acc, tags) => [...acc, ...tags], [])
      // remove prefix
      .map((scope: string) => scope.slice(prefixLength));

    // remove duplicates
    return Array.from(new Set(allScopes));
  }
}

export { ITagsFromProjects, getTagsFromProjects };
