import { DomainEvent } from '@bookstore-nx/ddd-core';
import { CreateBookDto } from '../../shared';


export class BookCreatedEvent extends DomainEvent<CreateBookDto>
{
  get createBookDto(): CreateBookDto
  {
    return this.props;
  }

  private constructor(props: CreateBookDto)
  {
    super(props);
  }

  static create(props: CreateBookDto): BookCreatedEvent
  {
    return new BookCreatedEvent(props);
  }
}
