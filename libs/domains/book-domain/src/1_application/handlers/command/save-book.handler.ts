import { UniqueEntityID } from '@bookstore-nx/ddd-core';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { BookAggregate, BookAggregateResult } from '../../../0_domain';
import { BookDataEntryDto } from '../../../shared';
import { SaveBookCommand } from '../../commands';

@CommandHandler(SaveBookCommand)
export class SaveBookCommandHandler implements ICommandHandler<SaveBookCommand>{


  constructor(readonly eventPublisher: EventPublisher)
  {
  }

  execute(command: SaveBookCommand): Promise<void>
  {
    return new Promise((resolve, reject) =>
    {
      const bookDataEntryDto: BookDataEntryDto = command.bookDataEntryDto;
      const bookAggregateResult: BookAggregateResult = BookAggregate.create(bookDataEntryDto, UniqueEntityID.create(bookDataEntryDto.id));

      if (bookAggregateResult.isSuccess())
      {
        const bookAggregate: BookAggregate = bookAggregateResult.getValue();
        bookAggregate.updateBook();

        // mergeObjectContext & commit PUBLISHES EVENTS FROM AGGREGATE...
        this.eventPublisher.mergeObjectContext(bookAggregate);
        bookAggregate.commit();
        resolve();
        return;
      }

      if (bookAggregateResult.isFailure())
      {
        reject(bookAggregateResult.getError());
        return;
      }
    });
  }
}
