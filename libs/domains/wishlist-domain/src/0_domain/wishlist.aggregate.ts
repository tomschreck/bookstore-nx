import { Aggregate, DomainError, Either, failure, Guard, IGuardResult, success, UniqueEntityID } from '@bookstore-nx/ddd-core';
import { CONFIG } from '../domain.config';
import { WishlistDto } from '../shared';
import { WishlistCreatedEvent, WishlistItemRemovedEvent } from './events';


export type WishlistAggregateResult = Either<
  // Success
  WishlistAggregate,

  // Failures
  WishlistError
>;

export class WishlistError extends DomainError
{
  constructor(errorMessage: string)
  {
    super(errorMessage, null, 'Wishlist ERROR');
  }
}

export class WishlistAggregate extends Aggregate<WishlistDto> {

  private constructor(props: WishlistDto, id?: UniqueEntityID)
  {
    super(props, id);
  }

  createWishlist()
  {
    this.apply(WishlistCreatedEvent.create(this.props));
  }

  removeWishlistItem()
  {
    this.apply(WishlistItemRemovedEvent.create(this.props));
  }


  static create(props: WishlistDto, id?: UniqueEntityID): WishlistAggregateResult
  {
    const guardList: IGuardResult[] = [];
    guardList.push(Guard.passesRegex(props.userId, 'userId', CONFIG.REGEX.UUID));

    props.bookList.forEach((item: string) =>
      guardList.push(Guard.passesRegex(item, 'bookId', CONFIG.REGEX.UUID)
      ));

    const guardResult = Guard.combine(guardList);

    if (!guardResult.succeeded) return failure(new WishlistError(guardResult.message));

    const wishlistAggregate = new WishlistAggregate({ ...props, userId: props.userId || id.toString() }, id);

    return success(wishlistAggregate);
  }
}
