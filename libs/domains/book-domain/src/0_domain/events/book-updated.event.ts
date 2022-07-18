import { BookDataEntryDto } from '../../shared';
import { BookEventBase } from './book-event-base';


export class BookUpdatedEvent extends BookEventBase
{
  private constructor(props: BookDataEntryDto)
  {
    super(props);
  }

  static create(props: BookDataEntryDto): BookUpdatedEvent
  {
    return new BookUpdatedEvent(props);
  }
}
