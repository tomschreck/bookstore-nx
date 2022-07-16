import { Body, Controller, Get, HttpException, Logger, Post } from "@nestjs/common";
import { catchError } from 'rxjs';
import { AppService } from "./app.service";
@Controller()
export class AppController
{
  constructor(private readonly appService: AppService) { }

  @Get()
  getData()
  {
    return this.appService.getData();
  }

  @Post('/create-book')
  create(@Body() createBookDto)
  {
    Logger.log(`01 | REST: POST CREATE BOOK: ${createBookDto.title}`, 'BOOKSTORE-API-GATEWAY-REST');
    this.appService.createBook(createBookDto)
      .pipe
      (
        catchError((error) =>
        {
          console.log('WTF', error);
          throw new HttpException(error, 500);
        })
      );
  }
}
