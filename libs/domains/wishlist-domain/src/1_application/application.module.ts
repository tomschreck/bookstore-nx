import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateWishlistCommandHandler, RemoveWishlistItemCommandHandler } from './handlers';

@Module({
  imports: [ CqrsModule ],
  providers:
    [
      CreateWishlistCommandHandler,
      RemoveWishlistItemCommandHandler
    ],
  exports: []
})
export class ApplicationModule { }
