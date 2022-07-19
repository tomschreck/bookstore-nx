import { GetWishlistUseCase, WishlistDto } from '@bookstore-nx/domains/wishlist-domain';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller("wishlist")
export class WishlistController
{
  constructor
    (
      private readonly getWishlistUseCase: GetWishlistUseCase
    ) { }

  @MessagePattern({ role: 'wishlist', cmd: 'get-one' })
  async createBook(id: string): Promise<WishlistDto>
  {
    return this.getWishlistUseCase.executeAsync(id);
  }
}
