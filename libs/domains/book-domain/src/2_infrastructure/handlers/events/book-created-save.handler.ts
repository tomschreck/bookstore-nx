import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { BookCreatedEvent } from '../../../0_domain';
import { CreateBookDto } from '../../../shared';
import { BookEntity, BookRepository } from '../../repos';


@EventsHandler(BookCreatedEvent)
export class BookCreatedSaveEventHandler implements IEventHandler<BookCreatedEvent> {

  constructor(
    private readonly bookRepository: BookRepository,
  ) { }

  public async handle(event: BookCreatedEvent): Promise<void>
  {

    Logger.log(`06 | EVENT HANDLER: BOOK CREATED, NOW SAVE ${event.createBookDto.title}`, 'BOOK DOMAIN');

    const createBookDto: CreateBookDto = event.createBookDto;

    const bookEntity: BookEntity = new BookEntity();
    bookEntity.id = createBookDto.id;
    bookEntity.title = createBookDto.title;
    bookEntity.author = createBookDto.author;
    bookEntity.isbn = createBookDto.isbn;
    bookEntity.category = createBookDto.category;
    bookEntity.status = createBookDto.status;
    bookEntity.price = createBookDto.price;
    bookEntity.inventory = createBookDto.inventory;
    bookEntity.notes = createBookDto.notes;

    await this.bookRepository.save(bookEntity);
  }
}
