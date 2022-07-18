import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { WishlistCreatedEvent } from '../../../0_domain/events';
import { WishlistDto } from '../../../shared';
import { WishlistRepository } from '../../repos';


@EventsHandler(WishlistCreatedEvent)
export class WishlistSaveEventHandler implements IEventHandler<WishlistCreatedEvent> {

  constructor(
    private readonly wishlistRepository: WishlistRepository,
  ) { }

  async handle(event: WishlistCreatedEvent): Promise<void>
  {
    const wishlistDto: WishlistDto = event.wishlistDto;
    await this.wishlistRepository.saveWishlist(wishlistDto);
  }
}
