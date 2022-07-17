import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { BookCreatedEvent, BookEventBase } from '../../../0_domain';
import { BookDataEntryDto } from '../../../shared';
import { BookReadOnlyRepository } from '../../repos';


@EventsHandler(BookCreatedEvent)
export class BookCreatedSaveProjectionEventHandler implements IEventHandler
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
