import { Module } from "@nestjs/common";
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationModule } from '../1_application';
import { InfrastructureModule } from '../2_infrastructure';
import { AdjustInventoryUseCase } from './adjust-inventory';
import { CreateBookUseCase } from './create-book';
import { GetBookUseCase } from './get-book';
import { SaveBookUseCase } from './save-book';

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
