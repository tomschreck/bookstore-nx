import { Module } from "@nestjs/common";
import { CqrsModule } from '@nestjs/cqrs';
import { CreateBookCommandHandler, SaveBookCommandHandler } from './handlers';

@Module({
  imports: [ CqrsModule ],
  providers: [ CreateBookCommandHandler, SaveBookCommandHandler ],
  exports: []
})
export class ApplicationModule { }
