import { IUseCase } from '@bookstore-nx/ddd-core';
import { Injectable } from "@nestjs/common";
import { BookReadOnlyEntity, BookReadOnlyRepository } from '../2_infrastructure';
import { BookForWebDto } from '../shared';


@Injectable()
export class GetBookForWebUseCase implements IUseCase<string, BookForWebDto> {

  constructor
    (
      readonly bookReadOnlyRepository: BookReadOnlyRepository
    ) { }

  async executeAsync(input: string): Promise<BookForWebDto>
  {
    const bookReadOnlyEntity: BookReadOnlyEntity = await this.bookReadOnlyRepository.findOneBy(input);

    const bookForWebDto: BookForWebDto = {
      id: bookReadOnlyEntity.id,
      title: bookReadOnlyEntity.title,
      author: bookReadOnlyEntity.author,
      isbn: bookReadOnlyEntity.isbn,
      category: bookReadOnlyEntity.category,
      status: bookReadOnlyEntity.status,
      price: bookReadOnlyEntity.price,
      inventory: bookReadOnlyEntity.inventory
    };

    return bookForWebDto;
  }

}
