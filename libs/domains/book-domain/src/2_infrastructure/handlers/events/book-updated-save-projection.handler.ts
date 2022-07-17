import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { BookUpdatedEvent } from '../../../0_domain';
import { BookDataEntryDto } from '../../../shared';
import { BookReadOnlyRepository } from '../../repos';


@EventsHandler(BookUpdatedEvent)
export class BookUpdatedSaveProjectionEventHandler implements IEventHandler<BookUpdatedEvent> {

  constructor(
    private readonly bookReadOnlyRepository: BookReadOnlyRepository,
  ) { }

  async handle(event: BookUpdatedEvent): Promise<void>
  {
    const bookDataEntryDto: BookDataEntryDto = event.bookDataEntryDto;

    await this.bookReadOnlyRepository.saveProjection(bookDataEntryDto);
  }
}
