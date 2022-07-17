import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { ApplicationModule } from './1_application';
import { InfrastructureModule } from "./2_infrastructure";
import { UseCasesModule } from './3_use-cases';

@Module({
  imports: [ CqrsModule, ApplicationModule, InfrastructureModule, UseCasesModule, ],
  controllers: [],
  providers: [],
  exports: [ UseCasesModule ],
})
export class BookDomainModule { }
