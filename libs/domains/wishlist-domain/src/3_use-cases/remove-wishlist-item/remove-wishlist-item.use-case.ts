import { IUseCase } from '@bookstore-nx/ddd-core';
import { Injectable } from "@nestjs/common";
import { CommandBus } from '@nestjs/cqrs';
import { RemoveWishlistItemCommand } from '../../1_application';
import { WishlistEntity, WishlistMapper, WishlistRepository } from '../../2_infrastructure';
import { WishlistDataEntryDto, WishlistDto } from '../../shared';


@Injectable()
export class RemoveWishlistItemUseCase implements IUseCase<WishlistDataEntryDto, void> {

  constructor(
    readonly commandBus: CommandBus,
    readonly wishlistRepository: WishlistRepository
  ) { }

  async executeAsync(input: WishlistDataEntryDto): Promise<void>
  {
    let wishlistEntity: WishlistEntity = await this.wishlistRepository.findOneBy(input.userId);

    if (!wishlistEntity)
    {
      wishlistEntity = WishlistMapper.toNewDomainModel(input);
    }

    const wishlistDto: WishlistDto = WishlistMapper.toDTO(wishlistEntity);
    const command: RemoveWishlistItemCommand = RemoveWishlistItemCommand.create(input, wishlistDto);

    return this.commandBus.execute(command);
  }

}
