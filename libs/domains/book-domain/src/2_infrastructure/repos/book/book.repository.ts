import { Repository } from "typeorm";
import { CustomRepository } from '../database';
import { BookEntity } from './book.entity';

@CustomRepository(BookEntity)
export class BookRepository extends Repository<BookEntity> {

}
