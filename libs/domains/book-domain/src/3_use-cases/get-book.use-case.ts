import { IUseCase } from '@bookstore-nx/ddd-core';
import { Injectable } from "@nestjs/common";
import { BookEntity, BookRepository } from '../2_infrastructure';
import { BookDto } from '../shared';


@Injectable()
export class GetBookUseCase implements IUseCase<string, BookDto> {

  constructor
    (
      readonly bookRepository: BookRepository
    ) { }

  async executeAsync(input: string): Promise<BookDto>
  {
    const bookEntity: BookEntity = await this.bookRepository.findOneBy(input);

    const bookDto: BookDto = {
      id: bookEntity.id,
      title: bookEntity.title,
      author: bookEntity.author,
      isbn: bookEntity.isbn,
      category: bookEntity.category,
      status: bookEntity.status,
      price: bookEntity.price,
      inventory: bookEntity.inventory,
      notes: bookEntity.notes
    };

    return bookDto;
  }

}
