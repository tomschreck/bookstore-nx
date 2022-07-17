import { IMapper } from '@bookstore-nx/ddd-core';
import { BookDataEntryDto } from '../../shared';
import { BookEntity } from '../repos';


export class BookMapper implements IMapper<BookEntity, BookDataEntryDto>
{
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() { }

  toDTO(input: BookEntity): BookDataEntryDto
  {
    const bookDataEntryDto: BookDataEntryDto = {
      id: input.id,
      title: input.title,
      author: input.author,
      isbn: input.isbn,
      category: input.category,
      status: input.status,
      price: input.price,
      inventory: input.inventory,
      notes: input.notes
    };

    return bookDataEntryDto;
  }

  toDomain(input: BookDataEntryDto): BookEntity
  {
    const bookEntity: BookEntity = new BookEntity();
    bookEntity.id = input.id;
    bookEntity.title = input.title;
    bookEntity.author = input.author;
    bookEntity.isbn = input.isbn;
    bookEntity.category = input.category;
    bookEntity.status = input.status;
    bookEntity.price = input.price;
    bookEntity.inventory = input.inventory;
    bookEntity.notes = input.notes;

    return bookEntity;
  }

  public static create(): BookMapper
  {
    return new BookMapper();
  }

}
