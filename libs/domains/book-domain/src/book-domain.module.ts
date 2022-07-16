import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { CreateBookCommandHandler } from "./1_application";
import { DatabaseModule } from './2_infrastructure';
import { CreateBookUseCase } from "./3_use-cases";


@Module({
  imports: [
    CqrsModule,
    DatabaseModule
  ],
  controllers: [],
  providers: [
    CreateBookUseCase,
    CreateBookCommandHandler
  ],
  exports: [ CreateBookUseCase ],
})
export class BookDomainModule { }
