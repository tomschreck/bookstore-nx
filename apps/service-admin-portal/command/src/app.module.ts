import { BookDomainModule } from '@bookstore-nx/domains/book-domain';
import { Module } from "@nestjs/common";
import { BookController } from './controllers';

@Module({
  imports: [ BookDomainModule ],
  controllers: [ BookController ]
})
export class AppModule { }
