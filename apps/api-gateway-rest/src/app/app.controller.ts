import { Body, Controller, Get, Logger, Post } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('/create-book')
  create(@Body() createBookDto) {
    Logger.log(`POST | CREATE BOOK: ${createBookDto.title}`, 'BOOKSTORE-API-GATEWAY-REST');
    this.appService.createBook(createBookDto).subscribe();
  }
}
