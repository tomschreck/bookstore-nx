import { Module } from "@nestjs/common";
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationModule } from '../1_application';
import { InfrastructureModule } from '../2_infrastructure';
import { AdjustInventoryUseCase } from './adjust-inventory.use-case';
import { CreateBookUseCase } from './create-book.use-case';
import { GetBookUseCase } from './get-book.use-case';
import { SaveBookUseCase } from './save-book.use-case';

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
      GetBookUseCase,
      SaveBookUseCase
    ],
  exports:
    [
      AdjustInventoryUseCase,
      CreateBookUseCase,
      GetBookUseCase,
      SaveBookUseCase
    ]
})
export class UseCasesModule { }
