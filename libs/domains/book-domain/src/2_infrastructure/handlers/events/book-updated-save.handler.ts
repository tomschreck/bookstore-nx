import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { BookUpdatedEvent } from '../../../0_domain';
import { BookDataEntryDto } from '../../../shared';
import { BookRepository } from '../../repos';


@EventsHandler(BookUpdatedEvent)
export class BookUpdatedSaveEventHandler implements IEventHandler<BookUpdatedEvent> {

  constructor(
    private readonly bookRepository: BookRepository,
  ) { }

  async handle(event: BookUpdatedEvent): Promise<void>
  {
    const bookDataEntryDto: BookDataEntryDto = event.bookDataEntryDto;

    await this.bookRepository.saveBook(bookDataEntryDto);
  }
}
