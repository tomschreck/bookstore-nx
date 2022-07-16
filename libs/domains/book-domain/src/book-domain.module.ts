import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateBookCommandHandler } from "./1_application";
import
{
  BookCreatedSaveEventHandler,
  BookCreatedSaveProjectionEventHandler,
  BookEntity,
  BookRepository
} from "./2_infrastructure";
import { TypeOrmExModule } from './2_infrastructure/database/typeorm-ex.module';
import { CreateBookUseCase } from "./3_use-cases";


@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forRootAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        database: configService.get('POSTGRES_DATABASE'),
        username: configService.get('POSTGRES_USERNAME'),
        password: configService.get('POSTGRES_PASSWORD'),
        synchronize: true,
        autoLoadEntities: true,
        entities: [ BookEntity ]
        // entities: [ __dirname + './**/*.entity.{js,ts}' ]
      }),
    }),
    TypeOrmExModule.forCustomRepository([ BookRepository, BookEntity ])
  ],
  controllers: [],
  providers: [
    CreateBookUseCase,
    CreateBookCommandHandler,
    BookCreatedSaveEventHandler,
    BookCreatedSaveProjectionEventHandler,
  ],
  exports: [ CreateBookUseCase ],
})
export class BookDomainModule { }
