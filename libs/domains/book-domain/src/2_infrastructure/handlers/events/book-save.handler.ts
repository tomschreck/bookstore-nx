import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { BookCreatedEvent, BookEventBase, BookUpdatedEvent, InventoryAdjustedEvent } from '../../../0_domain';
import { BookDataEntryDto } from '../../../shared';
import { BookRepository } from '../../repos';


@EventsHandler(BookCreatedEvent, BookUpdatedEvent, InventoryAdjustedEvent)
export class BookSaveEventHandler implements IEventHandler<BookCreatedEvent> {

  constructor(
    private readonly bookRepository: BookRepository,
  ) { }

  async handle(event: BookEventBase): Promise<void>
  {
    const bookDataEntryDto: BookDataEntryDto = event.bookDataEntryDto;
    await this.bookRepository.saveBook(bookDataEntryDto);
  }
}
