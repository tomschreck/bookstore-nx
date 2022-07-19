import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { WishlistDto } from '../../../shared';
import { WishlistEntity } from './wishlist.entity';

@Injectable()
export class WishlistRepository
{

  constructor(
    @InjectRepository(WishlistEntity)
    private repository: Repository<WishlistEntity>,
  ) { }

  async findOneBy(id: string): Promise<WishlistEntity>
  {
    return this.repository.findOneBy({ userid: id });
  }

  async saveWishlist(wishlistDto: WishlistDto): Promise<void>
  {
    const wishlistEntity: WishlistEntity = new WishlistEntity();
    wishlistEntity.userid = wishlistDto.userId;
    wishlistEntity.bookList = wishlistDto.bookList.map((item: string) => item);

    await this.repository.save(wishlistEntity);
  }

  async clearWishlist(userId: string): Promise<void>
  {
    const wishlistEntity: WishlistEntity = new WishlistEntity();
    wishlistEntity.userid = userId;
    wishlistEntity.bookList = [];

    await this.repository.save(wishlistEntity);
  }

}
