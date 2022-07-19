import { AdjustInventoryDto, BookDataEntryDto } from '@bookstore-nx/domains/book-domain';
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService
{

  constructor(
    @Inject('SERVICE_ADMIN_PORTAL_COMMANDS') private readonly clientCommands: ClientProxy,
    @Inject('SERVICE_ADMIN_PORTAL_QUERIES') private readonly clientQueries: ClientProxy
  ) { }

  getData(id: string)
  {
    return this.clientQueries.send({ role: 'book', cmd: 'get-one' }, id);
  }

  createBook(bookDataEntryDto: BookDataEntryDto)
  {
    return this.clientCommands.emit({ role: 'book', cmd: 'create' }, bookDataEntryDto);
  }

  saveBook(bookDataEntryDto: BookDataEntryDto)
  {
    return this.clientCommands.emit({ role: 'book', cmd: 'save' }, bookDataEntryDto);
  }

  adjustInventory(adjustInventoryDto: AdjustInventoryDto)
  {
    return this.clientCommands.emit({ role: 'book', cmd: 'adjust-inventory' }, adjustInventoryDto);
  }
}
