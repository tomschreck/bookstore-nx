import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";

const logger = new Logger('BOOKSTORE-API-GATEWAY-REST');

async function bootstrap() {
  const globalPrefix = "api";
  const port = process.env.PORT || 3131;

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(globalPrefix);

  await app.listen(port).then(() => {
    logger.log(`Bookstore REST API Gateway is running on: http://localhost:${port}/${globalPrefix}`);
    logger.log('---------------------------------------------------------------------------------------------------');
    logger.log('');
    logger.log('');
  });
}

bootstrap();
