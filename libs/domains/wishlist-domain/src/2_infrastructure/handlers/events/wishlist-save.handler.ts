import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { WishlistCreatedEvent, WishlistEventBase, WishlistItemRemovedEvent } from '../../../0_domain/events';
import { WishlistDto } from '../../../shared';
import { WishlistRepository } from '../../repos';


@EventsHandler(WishlistCreatedEvent, WishlistItemRemovedEvent)
export class WishlistSaveEventHandler implements IEventHandler<WishlistCreatedEvent> {

  constructor(
    private readonly wishlistRepository: WishlistRepository,
  ) { }

  async handle(event: WishlistEventBase): Promise<void>
  {
    const wishlistDto: WishlistDto = event.wishlistDto;
    await this.wishlistRepository.saveWishlist(wishlistDto);
  }
}
