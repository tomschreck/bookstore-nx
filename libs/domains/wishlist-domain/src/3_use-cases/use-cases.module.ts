import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationModule } from '../1_application';
import { InfrastructureModule } from '../2_infrastructure';
import { ClearWishlistUseCase } from './clear-wishlist.use-case';
import { CreateWishlistUseCase } from './create-wishlist.use-case';
import { RemoveWishlistItemUseCase } from './remove-wishlist-item.use-case';

@Module({
  imports:
    [
      CqrsModule,
      InfrastructureModule,
      ApplicationModule
    ],
  providers:
    [
      ClearWishlistUseCase,
      CreateWishlistUseCase,
      RemoveWishlistItemUseCase
    ],
  exports:
    [
      ClearWishlistUseCase,
      CreateWishlistUseCase,
      RemoveWishlistItemUseCase
    ]
})
export class UseCasesModule { }
