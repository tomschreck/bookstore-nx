import { Repository } from "typeorm";
import { CustomRepository } from '../database';
import { BookReadOnlyEntity } from './book-read-only.entity';


@CustomRepository(BookReadOnlyEntity)
export class BookReadOnlyRepository extends Repository<BookReadOnlyEntity> {

}
