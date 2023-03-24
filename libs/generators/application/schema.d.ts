export interface ApplicationGeneratorSchema {
  scope: 'advisor-portal' | 'api' | 'workflow';
  framework: 'nest' | 'node' | 'react';
  name: string;
  type?: 'graphql' | 'rest';
  domain?: 'advisor-portal' | 'inforce-policy' | 'magic-meeting' | 'notification';
}
