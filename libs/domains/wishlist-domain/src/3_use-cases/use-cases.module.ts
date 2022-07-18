import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationModule } from '../1_application';
import { InfrastructureModule } from '../2_infrastructure';
import { CreateWishlistUseCase } from './create-wishlist';

@Module({
  imports:
    [
      CqrsModule,
      InfrastructureModule,
      ApplicationModule
    ],
  providers:
    [
      CreateWishlistUseCase
    ],
  exports:
    [
      CreateWishlistUseCase
    ]
})
export class UseCasesModule { }
