import { DomainEvent } from '@bookstore-nx/ddd-core';
import { WishlistDto } from '../../shared';

export class WishlistEventBase extends DomainEvent<WishlistDto>
{
  get wishlistDto(): WishlistDto
  {
    return this.props;
  }

  constructor(props: WishlistDto)
  {
    super(props);
  }
}
