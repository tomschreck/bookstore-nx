import { Module } from "@nestjs/common";
import { GetBookModule } from './get-book/get-book.module';

@Module({
  imports: [ GetBookModule ]
})
export class AppModule { }
