import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { BookEventBase, BookUpdatedEvent, InventoryAdjustedEvent } from '../../../0_domain';
import { BookDataEntryDto } from '../../../shared';
import { BookRepository } from '../../repos';


@EventsHandler(BookUpdatedEvent, InventoryAdjustedEvent)
export class BookUpdatedSaveEventHandler implements IEventHandler
{

  constructor(
    private readonly bookRepository: BookRepository,
  ) { }

  async handle(event: BookEventBase): Promise<void>
  {
    const bookDataEntryDto: BookDataEntryDto = event.bookDataEntryDto;
    await this.bookRepository.saveBook(bookDataEntryDto);
  }
}
