import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import
{
  BookCreatedSaveEventHandler,
  BookCreatedSaveProjectionEventHandler,
  GetBookQueryHandler
} from "./handlers";
import { BookUpdatedSaveProjectionEventHandler } from './handlers/events/book-updated-save-projection.handler';
import { BookUpdatedSaveEventHandler } from './handlers/events/book-updated-save.handler';
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
      BookCreatedSaveEventHandler,
      BookCreatedSaveProjectionEventHandler,
      BookUpdatedSaveEventHandler,
      BookUpdatedSaveProjectionEventHandler,
      GetBookQueryHandler,
    ],
  exports:
    [
      BookRepository,
      BookReadOnlyRepository,
      TypeOrmModule
    ]
})
export class InfrastructureModule { }
