import { Module } from "@nestjs/common";
import { AdjustBookInventoryModule } from "./adjust-book-inventory/adjust-book-inventory.module";
import { CreateBookModule } from "./create-book/create-book.module";
import { SaveBookModule } from "./save-book/save-book.module";

@Module({
  imports:
    [
      AdjustBookInventoryModule,
      CreateBookModule,
      SaveBookModule
    ]
})
export class AppModule { }
