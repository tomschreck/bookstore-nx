import { Aggregate, Either, failure, success, UniqueEntityID } from '@bookstore-nx/ddd-core';
import { BookDataEntryDto } from '../shared';
import { Book, BookError, BookResult } from './book.entity';
import { BookCreatedEvent, BookUpdatedEvent, InventoryAdjustedEvent } from './events';

export type BookAggregateResult = Either<
  // Success
  BookAggregate,

  // Failures
  BookError
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

    const bookAggregate = new BookAggregate({ ...props, id: props.id || id.toString() }, bookResult.getValue(), id);

    return success(bookAggregate);
  }
}
