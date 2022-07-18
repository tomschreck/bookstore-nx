import { WishlistDomainModule } from '@bookstore-nx/domains/wishlist-domain';
import { Module } from "@nestjs/common";
import { CreateWishlistController } from './create-wishlist.controller';

@Module({
  imports: [ WishlistDomainModule ],
  controllers: [ CreateWishlistController ],
  providers: []
})
export class CreateWishlistModule { }
