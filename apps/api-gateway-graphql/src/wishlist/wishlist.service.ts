import { WishlistDataEntryDto } from '@bookstore-nx/domains/wishlist-domain';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class WishlistService
{
  constructor(
    @Inject('SERVICE_WISHLIST_COMMANDS') private readonly clientCommands: ClientProxy,
    @Inject('SERVICE_WISHLIST_QUERIES') private readonly clientQueries: ClientProxy
  ) { }

  findOne(id: string)
  {
    return this.clientQueries.emit({ role: 'wishlist', cmd: 'get-one' }, id);
  }



  create(wishlistInput: WishlistDataEntryDto)
  {
    return this.clientCommands.emit({ role: 'wishlist', cmd: 'create' }, wishlistInput);
  }

  remove(wishlistInput: WishlistDataEntryDto)
  {
    return this.clientCommands.emit({ role: 'wishlist', cmd: 'remove' }, wishlistInput);
  }

  clear(userId: string)
  {
    return this.clientCommands.emit({ role: 'wishlist', cmd: 'clear' }, userId);
  }
}
