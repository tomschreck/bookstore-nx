import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class CreateBookService {

  createBook(createBookDto): Promise<void> {
    Logger.log(`SERVICE | CREATE BOOK: ${createBookDto.title}`, 'ADMIN-PORTAL-SERVICE');

    return Promise.resolve();
  }
}
