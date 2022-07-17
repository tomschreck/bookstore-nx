
import { AdjustInventoryDto, AdjustInventoryUseCase } from '@bookstore-nx/domains/book-domain';
import { Controller } from "@nestjs/common";
import { MessagePattern } from '@nestjs/microservices';


@Controller("adjust-book-inventory")
export class AdjustInventoryController
{
  constructor(private readonly adjustInventoryUseCase: AdjustInventoryUseCase) { }

  @MessagePattern({ role: 'book', cmd: 'adjust-inventory' })
  async adjustInventory(adjustInventoryDto: AdjustInventoryDto): Promise<void>
  {
    await this.adjustInventoryUseCase.executeAsync(adjustInventoryDto);
  }
}
