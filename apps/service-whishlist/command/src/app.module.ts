import { Module } from "@nestjs/common";
import { CreateWishlistModule } from './create-wishlist';

@Module({
  imports: [ CreateWishlistModule ],
  controllers: [],
  providers: [],
})
export class AppModule { }
