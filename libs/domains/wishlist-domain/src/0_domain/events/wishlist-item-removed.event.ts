import { WishlistDto } from '../../shared';
import { WishlistEventBase } from './wishlist-event-base';


export class WishlistItemRemovedEvent extends WishlistEventBase
{
  private constructor(props: WishlistDto)
  {
    super(props);
  }

  static create(props: WishlistDto): WishlistItemRemovedEvent
  {
    return new WishlistItemRemovedEvent(props);
  }
}
