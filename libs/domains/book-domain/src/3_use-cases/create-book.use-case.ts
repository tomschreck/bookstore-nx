import { IUseCase } from '@bookstore-nx/ddd-core';
import { Injectable } from "@nestjs/common";
import { CommandBus } from '@nestjs/cqrs';
import { CreateBookCommand } from '../1_application';
import { BookDataEntryDto } from '../shared';


@Injectable()
export class CreateBookUseCase implements IUseCase<BookDataEntryDto, void> {

  constructor(readonly commandBus: CommandBus) { }

  async executeAsync(input: BookDataEntryDto): Promise<void>
  {
    const command: CreateBookCommand = CreateBookCommand.create(input);
    return this.commandBus.execute(command);
  }

}
