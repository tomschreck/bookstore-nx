import { INestMicroservice, Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from "./app.module";

const logger = new Logger('ADMIN-PORTAL-SERVICE');

async function bootstrap() {

  const app: INestMicroservice = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP
    }
  );

  await app.listen().then(() => logger.log('Microservice is listening...'));
}

bootstrap();
