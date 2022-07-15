import { IUseCase } from '@bookstore-nx/ddd-core';
import { Injectable, Logger } from "@nestjs/common";
import { CommandBus } from '@nestjs/cqrs';
import { CreateBookCommand } from '../../1_application/commands';
import { CreateBookDto } from '../../shared';


@Injectable()
export class CreateBookUseCase implements IUseCase<CreateBookDto, void> {

  constructor(readonly commandBus: CommandBus) { }

  async executeAsync(input: CreateBookDto): Promise<void> {

    Logger.log(`04 | USE CASE: CREATE COMMAND`, 'BOOK DOMAIN');

    const command: CreateBookCommand = CreateBookCommand.create(input)
    await this.commandBus.execute(command);
  }

}
