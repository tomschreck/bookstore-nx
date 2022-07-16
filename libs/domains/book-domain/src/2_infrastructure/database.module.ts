import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookCreatedSaveEventHandler, BookCreatedSaveProjectionEventHandler } from './handlers';
import { BookEntity, BookReadOnlyEntity, BookReadOnlyRepository, BookRepository } from './repos';
import { TypeOrmExModule } from './repos/database';

@Module({
  imports:
    [
      TypeOrmModule.forRootAsync({
        imports: [ ConfigModule ],
        inject: [ ConfigService ],
        useFactory: (configService: ConfigService) => ({
          type: "postgres",
          host: configService.get("POSTGRES_HOST"),
          port: configService.get("POSTGRES_PORT"),
          database: configService.get("POSTGRES_DATABASE"),
          username: configService.get("POSTGRES_USERNAME"),
          password: configService.get("POSTGRES_PASSWORD"),
          synchronize: true,
          autoLoadEntities: true,
          entities: [ BookEntity, BookReadOnlyEntity ]
        }),
      }),
      TypeOrmExModule.forCustomRepository(
        [
          BookRepository,
          BookEntity,
          BookReadOnlyEntity,
          BookReadOnlyRepository
        ]),
    ],
  providers: [ BookCreatedSaveEventHandler, BookCreatedSaveProjectionEventHandler ]
})
export class DatabaseModule { }
