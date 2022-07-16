import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { BookEntity } from '../book';


@Injectable()
export class DatabaseOptions implements TypeOrmOptionsFactory
{
  createTypeOrmOptions(): TypeOrmModuleOptions
  {
    return {
      entities: [ BookEntity ],
    };
  }
}
