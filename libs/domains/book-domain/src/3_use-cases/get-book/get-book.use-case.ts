import { IUseCase } from '@bookstore-nx/ddd-core';
import { Injectable } from "@nestjs/common";
import { QueryBus } from '@nestjs/cqrs';
import { GetBookQuery } from '../../1_application';
import { BookReadOnlyEntity } from '../../2_infrastructure';
import { BookDto } from '../../shared';


@Injectable()
export class GetBookUseCase implements IUseCase<string, BookDto> {

  constructor(readonly queryBus: QueryBus) { }

  async executeAsync(input: string): Promise<BookDto>
  {
    const query: GetBookQuery = GetBookQuery.create(input);
    const bookReadOnlyEntity: BookReadOnlyEntity = await this.queryBus.execute(query);

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
