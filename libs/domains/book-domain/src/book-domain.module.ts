import { Module } from "@nestjs/common";
import { CqrsModule } from '@nestjs/cqrs';
import { CreateBookCommandHandler } from './1_application';
import { BookCreatedSaveEventHandler, BookCreatedSaveProjectionEventHandler } from './2_infrastructure';
import { CreateBookUseCase } from './3_use-cases';

@Module({
  controllers: [],
  imports: [ CqrsModule ],
  providers: [ CreateBookUseCase, CreateBookCommandHandler, BookCreatedSaveEventHandler, BookCreatedSaveProjectionEventHandler ],
  exports: [ CreateBookUseCase ],
})
export class BookDomainModule { }
