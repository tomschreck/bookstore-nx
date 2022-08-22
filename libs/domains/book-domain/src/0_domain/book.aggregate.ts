import { Aggregate, Either, failure, success, UniqueEntityID } from '@bookstore-nx/ddd-core';
import { BookDataEntryDto } from '../shared';
import { Book, BookError, BookResult } from './book.entity';
import { BookCreatedEvent, BookUpdatedEvent, InventoryAdjustedEvent } from './events';
import { ISBNError } from './isbn.vo';

export type BookAggregateResult = Either<
  // Success
  BookAggregate,

  // Failures
  BookError |
  ISBNError
>;

export class BookAggregate extends Aggregate<BookDataEntryDto> {

  private _book: Book;

  get book(): Book
  {
    return this._book;
  }

  private constructor(props: BookDataEntryDto, book: Book, id?: UniqueEntityID)
  {
    super(props, id);
    this._book = book;

    // console.log(`IS NEW AGGREGATE: ${this.isNewAggregate}`);
    // console.log(`props id: ${props.id}`);
    // console.log(`this id: ${this.id}`);
    // console.log(`book.props id: ${book.id}`);
  }

  createBook()
  {
    this.apply(BookCreatedEvent.create(this.book.props));
  }
  updateBook()
  {
    this.apply(BookUpdatedEvent.create(this.book.props));
  }
  adjustInventory()
  {
    this.apply(InventoryAdjustedEvent.create(this.book.props));
  }


  static create(props: BookDataEntryDto, id?: UniqueEntityID): BookAggregateResult
  {
    const bookResult: BookResult = Book.create(props, id);

    if (bookResult.isFailure() === true)
    {
      return failure(bookResult.getError());
    }

    // create an id if one os not provided
    id = UniqueEntityID.create(props.id || id?.toString());

    const bookAggregate = new BookAggregate({ ...props, id: id.toString() }, bookResult.getValue(), id);

    return success(bookAggregate);
  }
}
