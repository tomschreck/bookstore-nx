import { DomainEvent } from '@bookstore-nx/ddd-core';
import { BookDataEntryDto } from '../../shared';


export class BookCreatedEvent extends DomainEvent<BookDataEntryDto>
{
  get bookDataEntryDto(): BookDataEntryDto
  {
    return this.props;
  }

  private constructor(props: BookDataEntryDto)
  {
    super(props);
  }

  static create(props: BookDataEntryDto): BookCreatedEvent
  {
    return new BookCreatedEvent(props);
  }
}
