import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { WishlistResolver } from './wishlist.resolver';
import { WishlistService } from './wishlist.service';

@Module({
  imports:
    [
      ClientsModule.register(
        [
          { name: 'SERVICE_WISHLIST_COMMANDS', transport: Transport.TCP, options: { port: 3002 } },
          { name: 'SERVICE_WISHLIST_QUERIES', transport: Transport.TCP, options: { port: 3003 } }
        ]),
    ],
  providers: [ WishlistResolver, WishlistService ]
})
export class WishlistModule { }
