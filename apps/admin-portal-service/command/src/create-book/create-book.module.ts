import { Module } from "@nestjs/common";
import { CreateBookController } from "./create-book.controller";
import { CreateBookService } from "./create-book.service";

@Module({
  controllers: [CreateBookController],
  providers: [CreateBookService],
})
export class CreateBookModule {}
