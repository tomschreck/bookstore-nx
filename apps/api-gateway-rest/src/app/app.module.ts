import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    ClientsModule.register(
      [
        { name: 'SERVICE_ADMIN_PORTAL_COMMANDS', transport: Transport.TCP, options: { port: 3000 } },
        { name: 'SERVICE_ADMIN_PORTAL_QUERIES', transport: Transport.TCP, options: { port: 3001 } }
      ])
  ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule { }
