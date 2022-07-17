import { BookDomainModule } from '@bookstore-nx/domains/book-domain';
import { Module } from "@nestjs/common";
import { CreateBookController } from "./create-book.controller";

@Module({
  imports: [ BookDomainModule ],
  controllers: [ CreateBookController ],
  providers: []
})
export class CreateBookModule { }
