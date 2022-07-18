import { IUseCase } from '@bookstore-nx/ddd-core';
import { Injectable } from "@nestjs/common";
import { CommandBus } from '@nestjs/cqrs';
import { SaveBookCommand } from '../../1_application';
import { BookEntity, BookMapper, BookRepository } from '../../2_infrastructure';
import { BookDataEntryDto } from '../../shared';


@Injectable()
export class SaveBookUseCase implements IUseCase<BookDataEntryDto, void> {

  constructor
    (
      readonly commandBus: CommandBus,
      readonly bookRepository: BookRepository
    ) { }

  async executeAsync(input: BookDataEntryDto): Promise<void>
  {
    const bookEntity: BookEntity = await this.bookRepository.findOneBy(input.id);
    const existingBookDataEntryDto: BookDataEntryDto = BookMapper.toDTO(bookEntity);
    const command: SaveBookCommand = SaveBookCommand.create(input, existingBookDataEntryDto);

    return this.commandBus.execute(command);
  }
}
