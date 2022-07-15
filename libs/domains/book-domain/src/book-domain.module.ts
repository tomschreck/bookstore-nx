import { Module } from "@nestjs/common";
import { CqrsModule } from '@nestjs/cqrs';
import { CreateBookCommandHandler } from './1_application';
import { CreateBookUseCase } from './3_use-cases';

@Module({
  controllers: [],
  imports: [CqrsModule],
  providers: [CreateBookUseCase, CreateBookCommandHandler],
  exports: [CreateBookUseCase],
})
export class BookDomainModule { }
