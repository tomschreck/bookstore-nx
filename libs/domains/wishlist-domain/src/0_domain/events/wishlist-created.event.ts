import { WishlistDto } from '../../shared';
import { WishlistEventBase } from './wishlist-event-base';


export class WishlistCreatedEvent extends WishlistEventBase
{
  private constructor(props: WishlistDto)
  {
    super(props);
  }

  static create(props: WishlistDto): WishlistCreatedEvent
  {
    return new WishlistCreatedEvent(props);
  }
}
