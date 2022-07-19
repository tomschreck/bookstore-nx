import { IUseCase } from '@bookstore-nx/ddd-core';
import { Injectable } from '@nestjs/common';
import { BookReadOnlyEntity, BookReadOnlyRepository } from '../2_infrastructure';
import { BookForWebDto, SearchDto } from '../shared';

@Injectable()
export class SearchBooksUseCase implements IUseCase<SearchDto, BookForWebDto[]> {

  constructor
    (
      readonly bookReadOnlyRepository: BookReadOnlyRepository
    ) { }

  async executeAsync(input: SearchDto): Promise<BookForWebDto[]>
  {
    const searchResults: BookReadOnlyEntity[] = await this.bookReadOnlyRepository.findMany(input);
    const results: BookForWebDto[] = [];

    searchResults.forEach((item: BookReadOnlyEntity) =>
    {
      const bookForWebDto: BookForWebDto = {
        id: item.id,
        title: item.title,
        author: item.author,
        isbn: item.isbn,
        category: item.category,
        status: item.status,
        price: item.price,
        inventory: item.inventory
      };

      results.push(bookForWebDto);
    });

    return results;
  }

}
