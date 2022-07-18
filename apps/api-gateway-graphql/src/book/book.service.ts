import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AdjustInventoryInput, BookInput } from './dto';

@Injectable()
export class BookService
{
  constructor(
    @Inject('SERVICE_ADMIN_PORTAL_COMMANDS') private readonly clientCommands: ClientProxy,
    @Inject('SERVICE_ADMIN_PORTAL_QUERIES') private readonly clientQueries: ClientProxy
  ) { }

  create(bookInput: BookInput)
  {
    return this.clientCommands.emit({ role: 'book', cmd: 'create' }, bookInput);
  }

  findAll()
  {
    return `This action returns all book`;
  }

  findOne(id: string)
  {
    console.log('FIND ONE', id);
    return this.clientQueries.send({ role: 'book', cmd: 'get' }, id);
  }

  update(bookInput: BookInput)
  {
    return this.clientCommands.emit({ role: 'book', cmd: 'save' }, bookInput);
  }

  adjustInventory(adjustInventoryInput: AdjustInventoryInput)
  {
    return this.clientCommands.emit({ role: 'book', cmd: 'adjust-inventory' }, adjustInventoryInput);
  }

  remove(id: string)
  {
    return `This action removes a #${id} book`;
  }
}
