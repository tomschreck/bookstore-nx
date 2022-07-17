import { BookDataEntryDto, BookDto } from '@bookstore-nx/domains/book-domain';
import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { firstValueFrom } from 'rxjs';
import { AppService } from "./app.service";
@Controller()
export class AppController
{
  constructor(private readonly appService: AppService) { }

  @Get(':id')
  getData(@Param() params): Promise<BookDto>
  {
    return firstValueFrom(this.appService.getData(params.id));
  }

  @Post('/create-book')
  create(@Body() bookDataEntryDto: BookDataEntryDto): Promise<void>
  {
    return firstValueFrom(this.appService.createBook(bookDataEntryDto));
  }

  @Put('/update-book')
  save(@Body() bookDataEntryDto: BookDataEntryDto): Promise<void>
  {
    return firstValueFrom(this.appService.saveBook(bookDataEntryDto));
  }
}
