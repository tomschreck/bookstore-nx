import { SearchDto } from '@bookstore-nx/domains/book-domain';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class WebPortalService
{
  constructor(
    @Inject('SERVICE_WEB_PORTAL_COMMANDS') private readonly clientCommands: ClientProxy,
    @Inject('SERVICE_WEB_PORTAL_QUERIES') private readonly clientQueries: ClientProxy
  ) { }

  findOne(id: string)
  {
    return this.clientQueries.send({ role: 'web-portal', cmd: 'get-one' }, id);
  }

  findMany(input: SearchDto)
  {
    return this.clientQueries.send({ role: 'web-portal', cmd: 'search' }, input);
  }

}
