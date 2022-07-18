import { INestMicroservice, Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from "./app.module";

const logger = new Logger('SERVICE-WISHLIST-QUERY');
const port = 3003;

async function bootstrap()
{

  const app: INestMicroservice = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options:
      {
        port: port
      }
    }
  );

  await app.listen().then(() =>
  {
    logger.log('-------------------------------------------------------------------------------------');
    logger.log(`SERVICE | WISHLIST QUERY Microservice is listening on port ${port}...`);
    logger.log('');
    logger.log('');
  });
}

bootstrap();
