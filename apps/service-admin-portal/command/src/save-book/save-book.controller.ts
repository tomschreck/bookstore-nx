
import { BookDataEntryDto, SaveBookUseCase } from '@bookstore-nx/domains/book-domain';
import { Controller } from "@nestjs/common";
import { MessagePattern } from '@nestjs/microservices';


@Controller("save-book")
export class SaveBookController
{
  constructor(private readonly saveBookUseCase: SaveBookUseCase) { }

  @MessagePattern({ role: 'book', cmd: 'save' })
  async saveBook(bookDataEntryDto: BookDataEntryDto): Promise<void>
  {
    await this.saveBookUseCase.executeAsync(bookDataEntryDto);
  }
}
