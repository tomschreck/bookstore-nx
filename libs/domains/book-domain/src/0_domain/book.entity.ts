import { DomainError, Either, Entity, failure, Guard, IGuardResult, success, UniqueEntityID } from '@bookstore-nx/ddd-core';
import { BookDataEntryDto } from '../shared';
import { ISBN, ISBNError, ISBNResult } from './isbn.vo';


export type BookResult = Either<
  // Success
  Book,

  // Failures
  BookError |
  ISBNError
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

    const isbnResult: ISBNResult = ISBN.create(props.isbn);

    if (isbnResult.isFailure() === true)
    {
      return failure(isbnResult.getError());
    }

    const guardResult = Guard.combine(guardList);
    if (!guardResult.succeeded) return failure(new BookError(guardResult.message));

    // create an id if one os not provided
    id = UniqueEntityID.create(props.id || id?.toString());

    const book = new Book({ ...props, id: id.toString() }, isbnResult.getValue(), id);

    return success(book);
  }
}
