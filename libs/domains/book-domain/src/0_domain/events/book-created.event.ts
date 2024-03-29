import { BookDataEntryDto } from '../../shared';
import { BookEventBase } from './book-event-base';


export class BookCreatedEvent extends BookEventBase
{
  private constructor(props: BookDataEntryDto)
  {
    super(props);
  }

  static create(props: BookDataEntryDto): BookCreatedEvent
  {
    return new BookCreatedEvent(props);
  }
}
