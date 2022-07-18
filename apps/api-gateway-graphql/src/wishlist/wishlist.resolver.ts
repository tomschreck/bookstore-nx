import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WishlistInput } from './dto';
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
  create(@Args('createWishlistInput') wishlistInput: WishlistInput)
  {
    return this.wishlistService.create(wishlistInput);
  }

  @Mutation('updateWishlist')
  update(@Args('updateWishlistInput') wishlistInput: WishlistInput)
  {
    return this.wishlistService.update(wishlistInput);
  }

  @Mutation('removeWishlist')
  remove(@Args('updateWishlistInput') wishlistInput: WishlistInput)
  {
    return this.wishlistService.remove(wishlistInput);
  }

  @Mutation('clearWishlist')
  clear(@Args('userId') userId: string)
  {
    return this.wishlistService.clear(userId);
  }
}
