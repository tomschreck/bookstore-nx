import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BookResolver } from './book.resolver';
import { BookService } from './book.service';

@Module({
  imports:
    [
      ClientsModule.register(
        [
          { name: 'SERVICE_ADMIN_PORTAL_COMMANDS', transport: Transport.TCP, options: { port: 3000 } },
          { name: 'SERVICE_ADMIN_PORTAL_QUERIES', transport: Transport.TCP, options: { port: 3001 } }
        ]),
    ],
  providers: [ BookResolver, BookService ]
})
export class BookModule { }
