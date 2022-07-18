import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { WishlistInput } from './dto';

@Injectable()
export class WishlistService
{
  constructor(
    @Inject('SERVICE_WISHLIST_COMMANDS') private readonly clientCommands: ClientProxy,
    @Inject('SERVICE_WISHLIST_QUERIES') private readonly clientQueries: ClientProxy
  ) { }

  create(wishlistInput: WishlistInput)
  {
    return this.clientCommands.emit({ role: 'wishlist', cmd: 'create' }, wishlistInput);
  }

  findAll()
  {
    return `This action returns all wishlist`;
  }

  findOne(id: string)
  {
    return `This action returns a #${id} wishlist`;
  }

  update(wishlistInput: WishlistInput)
  {
    return `This action updates a wishlist`;
  }

  remove(wishlistInput: WishlistInput)
  {
    return `This action removes an item from wishlist`;
  }

  clear(userId: string)
  {
    return `This action clears wishlist for ${userId}`;
  }
}
