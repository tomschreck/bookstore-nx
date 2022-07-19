
import { BookDto, GetBookUseCase } from '@bookstore-nx/domains/book-domain';
import { Controller } from "@nestjs/common";
import { MessagePattern } from '@nestjs/microservices';


@Controller("book")
export class BookController
{
  constructor
    (
      private readonly getBookUseCase: GetBookUseCase
    ) { }

  @MessagePattern({ role: 'book', cmd: 'get-one' })
  async createBook(id: string): Promise<BookDto>
  {
    return await this.getBookUseCase.executeAsync(id);
  }
}
