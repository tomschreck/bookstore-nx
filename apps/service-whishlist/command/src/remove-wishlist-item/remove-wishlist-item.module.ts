import { WishlistDomainModule } from '@bookstore-nx/domains/wishlist-domain';
import { Module } from "@nestjs/common";
import { RemoveWishlistItemController } from './remove-wishlist-item.controller';

@Module({
  imports: [ WishlistDomainModule ],
  controllers: [ RemoveWishlistItemController ],
  providers: []
})
export class RemoveWishlistModule { }
