import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateBookCommand } from '../../commands';


@CommandHandler(CreateBookCommand)
export class CreateBookCommandHandler implements ICommandHandler<CreateBookCommand>{


  execute(command: CreateBookCommand): Promise<void> {
    // const aggregate: CreateBookAggregate = CreateBookAggregate.create(command.createBookDto);

    Logger.log(`05 | COMMAND HANDLER: CREATE AGGREGATE`, 'BOOK DOMAIN');
    Logger.log(command.createBookDto);

    return;
  }

}
