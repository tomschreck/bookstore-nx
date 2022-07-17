import { UniqueEntityID } from '@bookstore-nx/ddd-core';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { BookAggregate, BookAggregateResult } from '../../../0_domain';
import { AdjustInventoryDto, BookDataEntryDto } from '../../../shared';
import { AdjustInventoryCommand } from '../../commands';


@CommandHandler(AdjustInventoryCommand)
export class AdjustInventoryCommandHandler implements ICommandHandler<AdjustInventoryCommand>{

  constructor(readonly eventPublisher: EventPublisher)
  {
  }

  execute(command: AdjustInventoryCommand): Promise<void>
  {
    return new Promise((resolve, reject) =>
    {
      const bookDataEntryDto: BookDataEntryDto = command.bookDataEntryDto;
      const adjustInventoryDto: AdjustInventoryDto = command.adjustInventoryDto;
      const updatedBookDataEntryDto: BookDataEntryDto = { ...bookDataEntryDto, inventory: adjustInventoryDto.inventory };
      const bookAggregateResult: BookAggregateResult = BookAggregate.create(updatedBookDataEntryDto, UniqueEntityID.create(bookDataEntryDto.id));

      if (bookAggregateResult.isSuccess())
      {
        const bookAggregate: BookAggregate = bookAggregateResult.getValue();
        bookAggregate.adjustInventory();

        // mergeObjectContext & commit PUBLISHES EVENTS FROM AGGREGATE...
        console.log('WTF', bookAggregate.id);
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
