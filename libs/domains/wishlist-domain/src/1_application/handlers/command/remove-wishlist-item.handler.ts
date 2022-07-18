import { UniqueEntityID } from '@bookstore-nx/ddd-core';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { WishlistAggregate, WishlistAggregateResult } from '../../../0_domain';
import { WishlistDataEntryDto, WishlistDto } from '../../../shared';
import { RemoveWishlistItemCommand } from '../../commands';


@CommandHandler(RemoveWishlistItemCommand)
export class RemoveWishlistItemCommandHandler implements ICommandHandler<RemoveWishlistItemCommand>{


  constructor(readonly eventPublisher: EventPublisher)
  {
  }

  execute(command: RemoveWishlistItemCommand): Promise<void>
  {
    return new Promise((resolve, reject) =>
    {
      const wishlistDataEntryDto: WishlistDataEntryDto = command.wishlistDataEntryDto;
      const existingWishlistDto: WishlistDto = command.existingWishlistDto;
      const booklistSet: Set<string> = new Set(existingWishlistDto.bookList);
      booklistSet.delete(wishlistDataEntryDto.bookId);

      existingWishlistDto.bookList = [ ...booklistSet ];

      const wishlistAggregateResult: WishlistAggregateResult = WishlistAggregate.create(existingWishlistDto, UniqueEntityID.create(wishlistDataEntryDto.userId));

      if (wishlistAggregateResult.isSuccess())
      {
        const wishlistAggregate: WishlistAggregate = wishlistAggregateResult.getValue();
        wishlistAggregate.removeWishlistItem();

        // mergeObjectContext & commit PUBLISHES EVENTS FROM AGGREGATE...
        this.eventPublisher.mergeObjectContext(wishlistAggregate);
        wishlistAggregate.commit();
        resolve();
        return;
      }

      if (wishlistAggregateResult.isFailure())
      {
        reject(wishlistAggregateResult.getError());
        return;
      }
    });
  }
}
