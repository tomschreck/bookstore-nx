import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { BookAggregate, BookAggregateResult } from '../../../0_domain';
import { CreateBookCommand } from '../../commands';


@CommandHandler(CreateBookCommand)
export class CreateBookCommandHandler implements ICommandHandler<CreateBookCommand>{


  constructor(readonly eventPublisher: EventPublisher)
  {
  }

  execute(command: CreateBookCommand): Promise<void>
  {
    return new Promise((resolve, reject) =>
    {
      Logger.log(`05 | COMMAND HANDLER: CREATE AGGREGATE`, 'BOOK DOMAIN');

      const bookAggregateResult: BookAggregateResult = BookAggregate.create(command.createBookDto);

      Logger.log(`05 | IS BOOK AGGREGATE: ${bookAggregateResult.isSuccess()}`, 'BOOK DOMAIN');


      if (bookAggregateResult.isSuccess())
      {
        const bookAggregate: BookAggregate = bookAggregateResult.getValue();

        Logger.log(bookAggregate.book.props, 'BOOK DOMAIN');

        // mergeObjectContext & commit kick off events in aggregate...
        this.eventPublisher.mergeObjectContext(bookAggregate);
        bookAggregate.commit();
        resolve();
        return;
      }


      if (bookAggregateResult.isFailure())
      {
        Logger.log(`05 | BOOK ERROR: ${bookAggregateResult.getError().message}`, 'BOOK DOMAIN');
        reject(bookAggregateResult.getError());
        return;
      }
    });
  }
}
