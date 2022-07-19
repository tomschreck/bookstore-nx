import { BookDomainModule } from '@bookstore-nx/domains/book-domain';
import { Module } from "@nestjs/common";
import { WebPortalController } from './controllers';

@Module({
  imports: [ BookDomainModule ],
  controllers: [ WebPortalController ],
  providers: [],
})
export class AppModule { }
