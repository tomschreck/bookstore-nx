import { WishlistDto } from '../../shared';
import { WishlistEventBase } from './wishlist-event-base';


export class WishlistUpdatedEvent extends WishlistEventBase
{
  private constructor(props: WishlistDto)
  {
    super(props);
  }

  static create(props: WishlistDto): WishlistUpdatedEvent
  {
    return new WishlistUpdatedEvent(props);
  }
}
