import { IUseCase } from '@bookstore-nx/ddd-core';
import { Injectable } from "@nestjs/common";
import { WishlistRepository } from '../2_infrastructure';


@Injectable()
export class ClearWishlistUseCase implements IUseCase<string, void> {

  constructor(
    readonly wishlistRepository: WishlistRepository
  ) { }

  async executeAsync(input: string): Promise<void>
  {
    await this.wishlistRepository.clearWishlist(input);

    return;
  }

}
