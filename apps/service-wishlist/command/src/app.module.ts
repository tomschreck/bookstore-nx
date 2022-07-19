import { WishlistDomainModule } from '@bookstore-nx/domains/wishlist-domain';
import { Module } from "@nestjs/common";
import { WishlistController } from './controllers';

@Module({
  imports: [ WishlistDomainModule ],
  controllers: [ WishlistController ],
  providers: [],
})
export class AppModule { }
