import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { BookEventBase, BookUpdatedEvent, InventoryAdjustedEvent } from '../../../0_domain';
import { BookDataEntryDto } from '../../../shared';
import { BookReadOnlyRepository } from '../../repos';


@EventsHandler(BookUpdatedEvent, InventoryAdjustedEvent)
export class BookUpdatedSaveProjectionEventHandler implements IEventHandler
{

  constructor(
    private readonly bookReadOnlyRepository: BookReadOnlyRepository,
  ) { }

  async handle(event: BookEventBase): Promise<void>
  {
    const bookDataEntryDto: BookDataEntryDto = event.bookDataEntryDto;
    await this.bookReadOnlyRepository.saveProjection(bookDataEntryDto);
  }
}
