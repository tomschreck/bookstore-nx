import { RemoveWishlistItemUseCase, WishlistDataEntryDto } from '@bookstore-nx/domains/wishlist-domain';
import { Controller } from "@nestjs/common";
import { MessagePattern } from '@nestjs/microservices';


@Controller("remove-wishlist-item")
export class RemoveWishlistItemController
{
  constructor(private readonly removeWishlistItemUseCase: RemoveWishlistItemUseCase) { }

  @MessagePattern({ role: 'wishlist', cmd: 'remove' })
  async createBook(wishlistDataEntryDto: WishlistDataEntryDto): Promise<void>
  {
    await this.removeWishlistItemUseCase.executeAsync(wishlistDataEntryDto);
  }
}
