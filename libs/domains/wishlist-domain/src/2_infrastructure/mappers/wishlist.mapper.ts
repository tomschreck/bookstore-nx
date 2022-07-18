import { WishlistDataEntryDto, WishlistDto } from '../../shared';
import { WishlistEntity } from '../repos';

export class WishlistMapper
{
  static toDTO(input: WishlistEntity): WishlistDto
  {
    if (input)
    {
      const wishlistDto: WishlistDto =
      {
        userId: input.userid,
        bookList: []
      };

      input.bookList.forEach((item: string) => wishlistDto.bookList.push(item));

      return wishlistDto;
    }

    return null;
  }

  static toNewDomainModel(input: WishlistDataEntryDto): WishlistEntity
  {
    const wishlistEntity = new WishlistEntity();
    wishlistEntity.userid = input.userId;
    wishlistEntity.bookList = [];
    return wishlistEntity;
  }
}
