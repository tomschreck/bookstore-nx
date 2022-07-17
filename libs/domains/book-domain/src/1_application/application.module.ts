import { Module } from "@nestjs/common";
import { CqrsModule } from '@nestjs/cqrs';
import { AdjustInventoryCommandHandler, CreateBookCommandHandler, SaveBookCommandHandler } from './handlers';

@Module({
  imports: [ CqrsModule ],
  providers: [ CreateBookCommandHandler, SaveBookCommandHandler, AdjustInventoryCommandHandler ],
  exports: []
})
export class ApplicationModule { }
