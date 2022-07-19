import { ClearWishlistUseCase, CreateWishlistUseCase, RemoveWishlistItemUseCase, WishlistDataEntryDto } from '@bookstore-nx/domains/wishlist-domain';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';


@Controller("wishlist")
export class WishlistController
{
  constructor
    (
      private readonly createWishlistUseCase: CreateWishlistUseCase,
      private readonly removeWishlistItemUseCase: RemoveWishlistItemUseCase,
      private readonly clearWishlistUseCase: ClearWishlistUseCase
    ) { }

  @MessagePattern({ role: 'wishlist', cmd: 'create' })
  async create(wishlistDataEntryDto: WishlistDataEntryDto): Promise<void>
  {
    await this.createWishlistUseCase.executeAsync(wishlistDataEntryDto);
  }

  @MessagePattern({ role: 'wishlist', cmd: 'remove' })
  async remove(wishlistDataEntryDto: WishlistDataEntryDto): Promise<void>
  {
    await this.removeWishlistItemUseCase.executeAsync(wishlistDataEntryDto);
  }

  @MessagePattern({ role: 'wishlist', cmd: 'clear' })
  async clear(userId: string): Promise<void>
  {
    await this.clearWishlistUseCase.executeAsync(userId);
  }
}
