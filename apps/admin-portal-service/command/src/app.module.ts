import { Module } from "@nestjs/common";
import { CreateBookModule } from "./create-book/create-book.module";
import { AdjustBookInventoryModule } from "./adjust-book-inventory/adjust-book-inventory.module";
import { SaveBookModule } from "./save-book/save-book.module";

@Module({
  imports: [CreateBookModule, AdjustBookInventoryModule, SaveBookModule]
})
export class AppModule { }
