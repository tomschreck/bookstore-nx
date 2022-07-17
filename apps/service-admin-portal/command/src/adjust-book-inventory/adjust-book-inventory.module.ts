import { BookDomainModule } from '@bookstore-nx/domains/book-domain';
import { Module } from "@nestjs/common";
import { AdjustInventoryController } from './adjust-book-inventory.controller';

@Module({
  imports: [ BookDomainModule ],
  controllers: [ AdjustInventoryController ],
  providers: []
})
export class AdjustBookInventoryModule { }
