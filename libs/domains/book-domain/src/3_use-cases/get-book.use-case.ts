import { IUseCase } from '@bookstore-nx/ddd-core';
import { Injectable } from "@nestjs/common";
import { BookReadOnlyEntity, BookReadOnlyRepository } from '../2_infrastructure';
import { BookDto } from '../shared';


@Injectable()
export class GetBookUseCase implements IUseCase<string, BookDto> {

  constructor
    (
      readonly bookReadOnlyRepository: BookReadOnlyRepository
    ) { }

  async executeAsync(input: string): Promise<BookDto>
  {
    const bookReadOnlyEntity: BookReadOnlyEntity = await this.bookReadOnlyRepository.findOneBy(input);

    const bookDto: BookDto = {
      id: bookReadOnlyEntity.id,
      title: bookReadOnlyEntity.title,
      author: bookReadOnlyEntity.author,
      isbn: bookReadOnlyEntity.isbn,
      category: bookReadOnlyEntity.category,
      status: bookReadOnlyEntity.status,
      price: bookReadOnlyEntity.price,
      inventory: bookReadOnlyEntity.inventory
    };

    return bookDto;
  }

}
