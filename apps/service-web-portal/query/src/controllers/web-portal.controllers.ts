import { BookForWebDto, GetBookForWebUseCase, SearchBooksUseCase, SearchDto } from '@bookstore-nx/domains/book-domain';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller("web-portal")
export class WebPortalController
{
  constructor
    (
      private readonly getBookForWebUseCase: GetBookForWebUseCase,
      private readonly searchBooksUseCase: SearchBooksUseCase
    ) { }

  @MessagePattern({ role: 'web-portal', cmd: 'get-one' })
  async getBook(id: string): Promise<BookForWebDto>
  {
    return this.getBookForWebUseCase.executeAsync(id);
  }

  @MessagePattern({ role: 'web-portal', cmd: 'search' })
  async search(input: SearchDto): Promise<BookForWebDto[]>
  {
    return this.searchBooksUseCase.executeAsync(input);
  }
}
