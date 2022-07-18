import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishlistSaveEventHandler } from './handlers';
import { WishlistEntity, WishlistRepository } from './repos';

@Module({
  imports:
    [
      TypeOrmModule.forFeature([
        WishlistEntity
      ]),
    ],
  providers:
    [
      WishlistRepository,
      WishlistSaveEventHandler
    ],
  exports:
    [
      WishlistRepository,
      TypeOrmModule
    ]
})
export class InfrastructureModule { }
