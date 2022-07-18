import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationModule } from '../1_application';
import { InfrastructureModule } from '../2_infrastructure';
import { CreateWishlistUseCase } from './create-wishlist';
import { RemoveWishlistItemUseCase } from './remove-wishlist-item';

@Module({
  imports:
    [
      CqrsModule,
      InfrastructureModule,
      ApplicationModule
    ],
  providers:
    [
      CreateWishlistUseCase,
      RemoveWishlistItemUseCase
    ],
  exports:
    [
      CreateWishlistUseCase,
      RemoveWishlistItemUseCase
    ]
})
export class UseCasesModule { }
