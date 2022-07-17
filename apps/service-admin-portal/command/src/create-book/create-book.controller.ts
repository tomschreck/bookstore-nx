
import { BookDataEntryDto, CreateBookUseCase } from '@bookstore-nx/domains/book-domain';
import { Controller } from "@nestjs/common";
import { MessagePattern } from '@nestjs/microservices';


@Controller("create-book")
export class CreateBookController
{
  constructor(private readonly createBookUseCase: CreateBookUseCase) { }

  @MessagePattern({ role: 'book', cmd: 'create' })
  async createBook(bookDataEntryDto: BookDataEntryDto): Promise<void>
  {
    await this.createBookUseCase.executeAsync(bookDataEntryDto);
  }
}
