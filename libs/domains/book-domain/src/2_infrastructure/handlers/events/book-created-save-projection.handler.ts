import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { BookCreatedEvent } from '../../../0_domain';


@EventsHandler(BookCreatedEvent)
export class BookCreatedSaveProjectionEventHandler implements IEventHandler<BookCreatedEvent> {

  public handle(event: BookCreatedEvent): void
  {

    Logger.log(`07 | EVENT HANDLER: BOOK CREATED, NOW SAVE PROJECTION ${event.createBookDto.title}`, 'BOOK DOMAIN');
  }
}
