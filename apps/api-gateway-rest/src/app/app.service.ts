import { CreateBookDto } from '@bookstore-nx/domains/book-domain';
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
    return this.clientQueries.send({ role: 'book', cmd: 'get' }, id);
  }

  createBook(createBookDto: CreateBookDto)
  {
    return this.clientCommands.emit({ role: 'book', cmd: 'create' }, createBookDto);
  }
}
