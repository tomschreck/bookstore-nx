import { IUseCase } from '@bookstore-nx/ddd-core';
import { Injectable } from "@nestjs/common";
import { WishlistEntity, WishlistRepository } from '../2_infrastructure';
import { WishlistDto } from '../shared';


@Injectable()
export class GetWishlistUseCase implements IUseCase<string, WishlistDto> {

  constructor
    (
      readonly wishlistRepository: WishlistRepository
    ) { }

  async executeAsync(input: string): Promise<WishlistDto>
  {
    const wishlistEntity: WishlistEntity = await this.wishlistRepository.findOneBy(input);

    const wishlistDto: WishlistDto = {
      userId: wishlistEntity.userid,
      bookList: wishlistEntity.bookList
    };

    return wishlistDto;
  }

}
