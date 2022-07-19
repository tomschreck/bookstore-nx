import { Module } from "@nestjs/common";
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationModule } from '../1_application';
import { InfrastructureModule } from '../2_infrastructure';
import { AdjustInventoryUseCase } from './adjust-inventory.use-case';
import { CreateBookUseCase } from './create-book.use-case';
import { GetBookForWebUseCase } from './get-book-for-web.use-case';
import { GetBookUseCase } from './get-book.use-case';
import { SaveBookUseCase } from './save-book.use-case';
import { SearchBooksUseCase } from './search-books.use-case';

@Module({
  imports:
    [
      CqrsModule,
      InfrastructureModule,
      ApplicationModule
    ],
  providers:
    [
      AdjustInventoryUseCase,
      CreateBookUseCase,
      GetBookForWebUseCase,
      GetBookUseCase,
      SaveBookUseCase,
      SearchBooksUseCase
    ],
  exports:
    [
      AdjustInventoryUseCase,
      CreateBookUseCase,
      GetBookForWebUseCase,
      GetBookUseCase,
      SaveBookUseCase,
      SearchBooksUseCase
    ]
})
export class UseCasesModule { }
