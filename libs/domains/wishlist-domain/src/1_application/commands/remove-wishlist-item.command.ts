import { CommandBase } from '@bookstore-nx/ddd-core';
import { WishlistDataEntryDto, WishlistDto } from '../../shared';


export class RemoveWishlistItemCommand extends CommandBase<WishlistDataEntryDto>
{
  private _existingWishlistDto: WishlistDto;

  get wishlistDataEntryDto(): WishlistDataEntryDto
  {
    return this.props;
  }

  get existingWishlistDto(): WishlistDto
  {
    return this._existingWishlistDto;
  }

  private constructor(props: WishlistDataEntryDto, existingWishlistDto: WishlistDto)
  {
    super(props);
    this._existingWishlistDto = existingWishlistDto;
  }

  static create(props: WishlistDataEntryDto, existingWishlistDto: WishlistDto): RemoveWishlistItemCommand
  {
    return new RemoveWishlistItemCommand(props, existingWishlistDto);
  }
}
