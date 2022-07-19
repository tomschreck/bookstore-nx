import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AdjustInventoryInput, CreateBookInput, UpdateBookInput } from './dto';

@Injectable()
export class BookAdminService
{
  constructor(
    @Inject('SERVICE_ADMIN_PORTAL_COMMANDS') private readonly clientCommands: ClientProxy,
    @Inject('SERVICE_ADMIN_PORTAL_QUERIES') private readonly clientQueries: ClientProxy
  ) { }

  findAll()
  {
    return `This action returns all book`;
  }

  findOne(id: string)
  {
    return this.clientQueries.send({ role: 'book', cmd: 'get-one' }, id);
  }


  create(bookInput: CreateBookInput)
  {
    return this.clientCommands.emit({ role: 'book', cmd: 'create' }, bookInput);
  }

  update(bookInput: UpdateBookInput)
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
