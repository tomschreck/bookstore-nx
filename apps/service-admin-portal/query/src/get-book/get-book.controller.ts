
import { BookDto, GetBookUseCase } from '@bookstore-nx/domains/book-domain';
import { Controller } from "@nestjs/common";
import { MessagePattern } from '@nestjs/microservices';


@Controller("get-book")
export class GetBookController
{
  constructor(private readonly getBookUseCase: GetBookUseCase) { }

  @MessagePattern({ role: 'book', cmd: 'get' })
  async createBook(id: string): Promise<BookDto>
  {
    return await this.getBookUseCase.executeAsync(id);
  }
}