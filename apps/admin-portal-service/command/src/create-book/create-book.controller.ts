import { Controller, Logger } from "@nestjs/common";
import { MessagePattern } from '@nestjs/microservices';
import { CreateBookService } from './create-book.service';

@Controller("create-book")
export class CreateBookController {
  constructor(private readonly createBookService: CreateBookService) { }

  @MessagePattern({ role: 'book', cmd: 'create' })
  async createBook(createBookDto): Promise<void> {
    Logger.log(`CONTROLLER | CREATE BOOK: ${createBookDto.title}`, 'ADMIN-PORTAL-SERVICE');
    await this.createBookService.createBook(createBookDto);
    return Promise.resolve();
  }
}
