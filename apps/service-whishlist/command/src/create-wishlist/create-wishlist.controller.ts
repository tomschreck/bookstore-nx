import { CreateWishlistUseCase, WishlistDataEntryDto } from '@bookstore-nx/domains/wishlist-domain';
import { Controller } from "@nestjs/common";
import { MessagePattern } from '@nestjs/microservices';


@Controller("create-wishlist")
export class CreateWishlistController
{
  constructor(private readonly createWishlistUseCase: CreateWishlistUseCase) { }

  @MessagePattern({ role: 'wishlist', cmd: 'create' })
  async createBook(wishlistDataEntryDto: WishlistDataEntryDto): Promise<void>
  {
    await this.createWishlistUseCase.executeAsync(wishlistDataEntryDto);
  }
}
