import { BookDomainModule } from '@bookstore-nx/domains/book-domain';
import { Module } from "@nestjs/common";
import { SaveBookController } from './save-book.controller';


@Module({
  imports: [ BookDomainModule ],
  controllers: [ SaveBookController ],
  providers: []
})
export class SaveBookModule { }
