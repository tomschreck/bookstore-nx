import { Module } from "@nestjs/common";
import { PurchaseBooksModule } from "./purchase-books/purchase-books.module";
import { ReserveBooksModule } from "./reserve-books/reserve-books.module";

@Module({
  imports: [PurchaseBooksModule, ReserveBooksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
