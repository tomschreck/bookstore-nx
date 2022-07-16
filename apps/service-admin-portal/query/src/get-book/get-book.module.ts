import { BookDomainModule } from '@bookstore-nx/domains/book-domain';
import { Module } from "@nestjs/common";
import { GetBookController } from './get-book.controller';

@Module({
  imports: [ BookDomainModule ],
  controllers: [ GetBookController ],
  providers: [],
})
export class GetBookModule { }
