import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { BookCreatedEvent } from '../../../0_domain';


@EventsHandler(BookCreatedEvent)
export class BookCreatedSaveEventHandler implements IEventHandler<BookCreatedEvent> {

  public handle(event: BookCreatedEvent): void
  {

    Logger.log(`06 | EVENT HANDLER: BOOK CREATED, NOW SAVE ${event.createBookDto.title}`, 'BOOK DOMAIN');
  }
}
