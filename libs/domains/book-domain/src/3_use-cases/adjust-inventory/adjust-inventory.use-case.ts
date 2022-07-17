import { IUseCase } from '@bookstore-nx/ddd-core';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AdjustInventoryCommand } from '../../1_application';
import { BookEntity, BookMapper, BookRepository } from '../../2_infrastructure';
import { AdjustInventoryDto, BookDataEntryDto } from '../../shared';

@Injectable()
export class AdjustInventoryUseCase implements IUseCase<AdjustInventoryDto, void> {

  constructor
    (
      readonly commandBus: CommandBus,
      readonly bookRepository: BookRepository
    ) { }

  async executeAsync(input: AdjustInventoryDto): Promise<void>
  {
    const bookEntity: BookEntity = await this.bookRepository.findOneBy(input.id);
    const bookDataEntryDto: BookDataEntryDto = BookMapper.create().toDTO(bookEntity);
    const command: AdjustInventoryCommand = AdjustInventoryCommand.create(input, bookDataEntryDto);

    return this.commandBus.execute(command);
  }
}
