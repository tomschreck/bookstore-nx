import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { WebPortalResolver } from './web-portal.resolver';
import { WebPortalService } from './web-portal.service';

@Module({
  imports:
    [
      ClientsModule.register(
        [
          { name: 'SERVICE_WEB_PORTAL_COMMANDS', transport: Transport.TCP, options: { port: 3004 } },
          { name: 'SERVICE_WEB_PORTAL_QUERIES', transport: Transport.TCP, options: { port: 3005 } }
        ]),
    ],
  providers: [ WebPortalResolver, WebPortalService ]
})
export class WebPortalModule { }
