import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { BookDataEntryDto } from '../../../shared';
import { BookReadOnlyEntity } from './book-read-only.entity';


@Injectable()
export class BookReadOnlyRepository
{

  constructor(
    @InjectRepository(BookReadOnlyEntity)
    private repository: Repository<BookReadOnlyEntity>,
  ) { }

  async findOneBy(id: string): Promise<BookReadOnlyEntity>
  {
    return this.repository.findOneBy({ id: id });
  }

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

    await this.repository.save(bookReadOnlyEntity);
  }
}
