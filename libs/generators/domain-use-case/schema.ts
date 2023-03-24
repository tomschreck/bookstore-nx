export interface DomainUseCaseGeneratorSchema {
  name: string;
  type: 'command' | 'query';
  projectName: string;
}
