
import { AdjustInventoryDto, AdjustInventoryUseCase, BookDataEntryDto, CreateBookUseCase, SaveBookUseCase } from '@bookstore-nx/domains/book-domain';
import { Controller } from "@nestjs/common";
import { MessagePattern } from '@nestjs/microservices';


@Controller("book")
export class BookController
{
  constructor
    (
      private readonly createBookUseCase: CreateBookUseCase,
      private readonly adjustInventoryUseCase: AdjustInventoryUseCase,
      private readonly saveBookUseCase: SaveBookUseCase
    ) { }

  @MessagePattern({ role: 'book', cmd: 'create' })
  async create(bookDataEntryDto: BookDataEntryDto): Promise<void>
  {
    await this.createBookUseCase.executeAsync(bookDataEntryDto);
  }

  @MessagePattern({ role: 'book', cmd: 'adjust-inventory' })
  async adjustInventory(adjustInventoryDto: AdjustInventoryDto): Promise<void>
  {
    await this.adjustInventoryUseCase.executeAsync(adjustInventoryDto);
  }

  @MessagePattern({ role: 'book', cmd: 'save' })
  async save(bookDataEntryDto: BookDataEntryDto): Promise<void>
  {
    await this.saveBookUseCase.executeAsync(bookDataEntryDto);
  }
}
