import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateWishlistCommandHandler } from './handlers';

@Module({
  imports: [ CqrsModule ],
  providers: [ CreateWishlistCommandHandler ],
  exports: []
})
export class ApplicationModule { }
