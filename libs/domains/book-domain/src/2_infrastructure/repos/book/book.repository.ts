import { Repository } from "typeorm";
import { BookDataEntryDto } from '../../../shared';
import { CustomRepository } from '../database';
import { BookEntity } from './book.entity';

@CustomRepository(BookEntity)
export class BookRepository extends Repository<BookEntity> {

  async saveBook(bookDataEntryDto: BookDataEntryDto): Promise<void>
  {
    const bookEntity: BookEntity = new BookEntity();
    bookEntity.id = bookDataEntryDto.id;
    bookEntity.title = bookDataEntryDto.title;
    bookEntity.author = bookDataEntryDto.author;
    bookEntity.isbn = bookDataEntryDto.isbn;
    bookEntity.category = bookDataEntryDto.category;
    bookEntity.status = bookDataEntryDto.status;
    bookEntity.price = bookDataEntryDto.price;
    bookEntity.inventory = bookDataEntryDto.inventory;
    bookEntity.notes = bookDataEntryDto.notes;

    await this.save(bookEntity);
  }

}
