import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { BookDataEntryDto } from '../../../shared';
import { BookEntity } from './book.entity';

@Injectable()
export class BookRepository
{

  constructor(
    @InjectRepository(BookEntity)
    private repository: Repository<BookEntity>,
  ) { }

  async findOneBy(id: string): Promise<BookEntity>
  {
    return this.repository.findOneBy({ id: id });
  }

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

    await this.repository.save(bookEntity);
  }

}
