/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { INestMicroservice, Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from "./app.module";

const logger = new Logger('SERVICE-ADMIN-PORTAL-QUERY');

async function bootstrap()
{

  const app: INestMicroservice = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options:
      {
        port: 3001
      }
    }
  );

  await app.listen().then(() =>
  {
    logger.log('Admin Portal Query Microservice is listening...');
    logger.log('-------------------------------------------------------------------------------------');
    logger.log('');
    logger.log('');
  });
}

bootstrap();
