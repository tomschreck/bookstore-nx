import { WishlistDataEntryDto } from '@bookstore-nx/domains/wishlist-domain';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WishlistService } from './wishlist.service';

@Resolver('Wishlist')
export class WishlistResolver
{
  constructor(private readonly wishlistService: WishlistService) { }


  @Query('wishlist')
  findOne(@Args('userId') userId: string)
  {
    return this.wishlistService.findOne(userId);
  }


  @Mutation('createWishlist')
  create(@Args('input') input: WishlistDataEntryDto)
  {
    return this.wishlistService.create(input);
  }

  @Mutation('removeWishlist')
  remove(@Args('input') input: WishlistDataEntryDto)
  {
    return this.wishlistService.remove(input);
  }

  @Mutation('clearWishlist')
  clear(@Args('userId') userId: string)
  {
    return this.wishlistService.clear(userId);
  }
}
