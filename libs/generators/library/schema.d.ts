export interface LibraryGeneratorSchema {
  scope: 'advisor-portal' | 'core' | 'domain' | 'shared';
  type: 'lib-domain' | 'lib-feature' | 'lib-ui' | 'lib-util';
  framework: 'nest' | 'node' | 'react';
  name: string;
  domain?: 'advisor-portal' | 'inforce-policy' | 'magic-meeting' | 'notification';
  databaseType?: 'sqlite' | `postgres`;
}
