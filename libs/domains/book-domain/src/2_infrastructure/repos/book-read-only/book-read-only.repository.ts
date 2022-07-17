import { Repository } from "typeorm";
import { BookDataEntryDto } from '../../../shared';
import { CustomRepository } from '../database';
import { BookReadOnlyEntity } from './book-read-only.entity';


@CustomRepository(BookReadOnlyEntity)
export class BookReadOnlyRepository extends Repository<BookReadOnlyEntity> {

  async saveProjection(bookDataEntryDto: BookDataEntryDto): Promise<void>
  {
    const bookReadOnlyEntity: BookReadOnlyEntity = new BookReadOnlyEntity();
    bookReadOnlyEntity.id = bookDataEntryDto.id;
    bookReadOnlyEntity.title = bookDataEntryDto.title;
    bookReadOnlyEntity.author = bookDataEntryDto.author;
    bookReadOnlyEntity.isbn = bookDataEntryDto.isbn;
    bookReadOnlyEntity.category = bookDataEntryDto.category;
    bookReadOnlyEntity.status = bookDataEntryDto.status;
    bookReadOnlyEntity.price = bookDataEntryDto.price;
    bookReadOnlyEntity.inventory = bookDataEntryDto.inventory;

    await this.save(bookReadOnlyEntity);
  }
}
