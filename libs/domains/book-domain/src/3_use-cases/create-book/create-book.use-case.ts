import { IUseCase } from '@bookstore-nx/ddd-core';
import { Injectable } from "@nestjs/common";
import { CommandBus } from '@nestjs/cqrs';
import { CreateBookCommand } from '../../1_application/commands';
import { CreateBookDto } from '../../shared';


@Injectable()
export class CreateBookUseCase implements IUseCase<CreateBookDto, void> {

  constructor(readonly commandBus: CommandBus) { }

  async executeAsync(input: CreateBookDto): Promise<void>
  {
    const command: CreateBookCommand = CreateBookCommand.create(input);
    return this.commandBus.execute(command);
  }

}
