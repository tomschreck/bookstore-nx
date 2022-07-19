import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { BookAdminModule } from './book-admin/book-admin.module';
import { upperDirectiveTransformer } from './common/directives';
import { WebPortalModule } from './web-portal/web-portal.module';
import { WishlistModule } from './wishlist/wishlist.module';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: [ './**/*.graphql' ],
      transformSchema: schema => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      definitions: {
        path: join(process.cwd(), 'apps/api-gateway-graphql/src/graphql.ts'),
      },
      playground: true
    }),
    BookAdminModule,
    WebPortalModule,
    WishlistModule
  ]
})
export class AppModule { }
