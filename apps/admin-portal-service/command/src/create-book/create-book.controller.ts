
import { CreateBookUseCase } from '@bookstore-nx/domains/book-domain';
import { Controller, Logger } from "@nestjs/common";
import { MessagePattern } from '@nestjs/microservices';


@Controller("create-book")
export class CreateBookController {
  constructor(private readonly createBookUseCase: CreateBookUseCase) { }

  @MessagePattern({ role: 'book', cmd: 'create' })
  async createBook(createBookDto): Promise<void> {
    Logger.log(`03 | CONTROLLER: EXECUTE USE CASE`, 'ADMIN-PORTAL-SERVICE');

    await this.createBookUseCase.executeAsync(createBookDto);
  }
}
