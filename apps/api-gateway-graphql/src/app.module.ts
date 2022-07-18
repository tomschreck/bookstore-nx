import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { BookModule } from './book/book.module';
import { upperDirectiveTransformer } from './common/directives';
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
    BookModule,
    WishlistModule
  ]
})
export class AppModule { }
