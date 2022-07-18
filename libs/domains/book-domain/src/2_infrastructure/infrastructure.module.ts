import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookSaveEventHandler, BookSaveProjectionEventHandler } from "./handlers";
import
{
  BookEntity,
  BookReadOnlyEntity,
  BookReadOnlyRepository,
  BookRepository
} from "./repos";

@Module({
  imports:
    [
      TypeOrmModule.forFeature([
        BookEntity,
        BookReadOnlyEntity
      ]),
    ],
  providers:
    [
      BookRepository,
      BookReadOnlyRepository,
      BookSaveEventHandler,
      BookSaveProjectionEventHandler
    ],
  exports:
    [
      BookRepository,
      BookReadOnlyRepository,
      TypeOrmModule
    ]
})
export class InfrastructureModule { }
