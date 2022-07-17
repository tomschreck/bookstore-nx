import { DomainError, Either, Entity, failure, Guard, IGuardResult, success, UniqueEntityID } from '@bookstore-nx/ddd-core';
import { BookDataEntryDto } from '../shared';
import { ISBN, ISBNResult } from './isbn.vo';


export type BookResult = Either<
  // Success
  Book,

  // Failures
  BookError
>;


export class BookError extends DomainError
{
  constructor(errorMessage: string)
  {
    super(errorMessage, null, 'BOOK ENTITY ERROR');
  }
}

export class Book extends Entity<BookDataEntryDto>
{
  private _isbn: ISBN;

  get isbn(): ISBN
  {
    return this._isbn;
  }

  private constructor(props: BookDataEntryDto, isbn: ISBN, id?: UniqueEntityID)
  {
    super(props, id);
    this._isbn = isbn;
  }

  static create(props: BookDataEntryDto, id?: UniqueEntityID): BookResult
  {
    const guardList: IGuardResult[] = [];
    guardList.push(Guard.againstNullOrUndefined(props.title, 'title'));
    guardList.push(Guard.againstNullOrUndefined(props.author, 'author'));
    guardList.push(Guard.againstNullOrUndefined(props.category, 'category'));
    guardList.push(Guard.isGreaterThanOrEqualTo(props.price, 0, 'price'));
    guardList.push(Guard.isGreaterThanOrEqualTo(props.inventory, 0, 'inventory'));

    const isbnResult: ISBNResult = ISBN.create(props.isbn);

    if (isbnResult.isFailure())
    {
      guardList.push(Guard.domainError(isbnResult.getError()));
    }

    const guardResult = Guard.combine(guardList);
    if (!guardResult.succeeded) return failure(new BookError(guardResult.message));

    const book = new Book(props, isbnResult.getValue(), id);

    return success(book);
  }
}
