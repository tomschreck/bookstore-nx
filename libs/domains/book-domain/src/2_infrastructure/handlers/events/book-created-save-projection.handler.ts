import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { BookCreatedEvent } from '../../../0_domain';
import { CreateBookDto } from '../../../shared';
import { BookReadOnlyEntity, BookReadOnlyRepository } from '../../repos';


@EventsHandler(BookCreatedEvent)
export class BookCreatedSaveProjectionEventHandler implements IEventHandler<BookCreatedEvent> {

  constructor(
    private readonly bookReadOnlyRepository: BookReadOnlyRepository,
  ) { }
  public async handle(event: BookCreatedEvent): Promise<void>
  {
    const createBookDto: CreateBookDto = event.createBookDto;

    const bookReadOnlyEntity: BookReadOnlyEntity = new BookReadOnlyEntity();
    bookReadOnlyEntity.id = createBookDto.id;
    bookReadOnlyEntity.title = createBookDto.title;
    bookReadOnlyEntity.author = createBookDto.author;
    bookReadOnlyEntity.isbn = createBookDto.isbn;
    bookReadOnlyEntity.category = createBookDto.category;
    bookReadOnlyEntity.status = createBookDto.status;
    bookReadOnlyEntity.price = createBookDto.price;
    bookReadOnlyEntity.inventory = createBookDto.inventory;

    await this.bookReadOnlyRepository.save(bookReadOnlyEntity);
  }
}
