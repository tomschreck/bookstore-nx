import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { BookDataEntryDto, SearchDto } from '../../../shared';
import { BookReadOnlyEntity } from './book-read-only.entity';


@Injectable()
export class BookReadOnlyRepository
{

  constructor(
    @InjectRepository(BookReadOnlyEntity)
    private repository: Repository<BookReadOnlyEntity>
  ) { }

  async findOneBy(id: string): Promise<BookReadOnlyEntity>
  {
    return this.repository.findOneBy({ id: id });
  }

  async findMany(input: SearchDto): Promise<BookReadOnlyEntity[]>
  {
    const query = this.repository.createQueryBuilder();

    if (input.title)
    {
      query.orWhere('title like :title', { title: `%${input.title}%` });
    }
    if (input.author)
    {
      query.orWhere('author like :author', { author: `%${input.author}%` });
    }
    if (input.category)
    {
      query.orWhere('category like :category', { category: `%${input.category}%` });
    }
    if (input.status)
    {
      query.orWhere('status like :status', { status: `%${input.status}%` });
    }

    let books: BookReadOnlyEntity[];
    try
    {
      books = await query.getMany();
    } catch (error)
    {
      throw new InternalServerErrorException(error);
    }
    return books;
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
