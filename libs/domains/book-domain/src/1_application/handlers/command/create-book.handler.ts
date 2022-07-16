import { UniqueEntityID } from '@bookstore-nx/ddd-core';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { BookAggregate, BookAggregateResult } from '../../../0_domain';
import { CreateBookDto } from '../../../shared';
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
      const createBookDto: CreateBookDto = command.createBookDto;
      const bookAggregateResult: BookAggregateResult = BookAggregate.create(createBookDto, UniqueEntityID.create(createBookDto.id));


      if (bookAggregateResult.isSuccess())
      {
        const bookAggregate: BookAggregate = bookAggregateResult.getValue();

        // mergeObjectContext & commit PUBLISH EVENTS FROM AGGREGATE...
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
