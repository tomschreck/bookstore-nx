import { Module } from "@nestjs/common";
import { CreateWishlistModule } from './create-wishlist';
import { RemoveWishlistModule } from './remove-wishlist-item';

@Module({
  imports:
    [
      CreateWishlistModule,
      RemoveWishlistModule
    ],
  controllers: [],
  providers: [],
})
export class AppModule { }
