import { DomainError, Either, failure, Guard, IGuardResult, success, ValueObject } from '@bookstore-nx/ddd-core';
import { CONFIG } from '../domain.config';

interface ISBNProps
{
  value: string;
}

export type ISBNResult = Either<
  // Success
  ISBN,

  // Failures
  ISBNError
>;

export class ISBNError extends DomainError
{
  constructor(errorMessage: string)
  {
    super(errorMessage, null, 'ISBN ERROR');
  }
}


export class ISBN extends ValueObject<ISBNProps>
{
  get value(): string
  {
    return this.props.value;
  }

  private constructor(props: ISBNProps)
  {
    super(props);
  }

  static create(value: string): ISBNResult
  {
    const guardResults: IGuardResult[] = [];
    guardResults.push(Guard.againstNullOrUndefined(value, 'isbn'));
    guardResults.push(Guard.passesRegex(value, 'isbn', CONFIG.REGEX.ISBN));

    const guardResult = Guard.combine(guardResults);

    if (!guardResult.succeeded) return failure(new ISBNError(guardResult.message));

    const isbn = new ISBN({ value });

    return success(isbn);
  }
}
