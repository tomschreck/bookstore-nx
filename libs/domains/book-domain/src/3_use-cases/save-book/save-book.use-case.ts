import { IUseCase } from '@bookstore-nx/ddd-core';
import { Injectable } from "@nestjs/common";
import { CommandBus } from '@nestjs/cqrs';
import { SaveBookCommand } from '../../1_application';
import { BookDataEntryDto } from '../../shared';


@Injectable()
export class SaveBookUseCase implements IUseCase<BookDataEntryDto, void> {

  constructor(readonly commandBus: CommandBus) { }

  async executeAsync(input: BookDataEntryDto): Promise<void>
  {
    const command: SaveBookCommand = SaveBookCommand.create(input);
    return this.commandBus.execute(command);
  }
}
