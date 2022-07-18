import { DomainEvent } from '@bookstore-nx/ddd-core';
import { BookDataEntryDto } from '../../shared';

export class BookEventBase extends DomainEvent<BookDataEntryDto>
{
  get bookDataEntryDto(): BookDataEntryDto
  {
    return this.props;
  }

  constructor(props: BookDataEntryDto)
  {
    super(props);
  }
}
