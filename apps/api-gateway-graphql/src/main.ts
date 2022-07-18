import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const logger = new Logger('BOOKSTORE-API-GATEWAY-GRAPHQL');

async function bootstrap()
{
  const globalPrefix = 'api';
  const port = process.env.PORT || 3333;

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(globalPrefix);

  await app.listen(port).then(() =>
  {
    logger.log('-------------------------------------------------------------------------------------');
    logger.log(`Bookstore GraphQL API Gateway is running on: http://localhost:${port}/graphql`);
    logger.log('');
    logger.log('');
  });
}

bootstrap();
