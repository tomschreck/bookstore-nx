export type Either<S, F> = Success<S, F> | Failure<S, F>;

export interface ResultFromEither
{
  isSuccess(): boolean;
  isFailure(): boolean;
  getValue();
  getError();
}

export class Success<S, F> implements ResultFromEither
{
  private readonly value: S;

  constructor(value: S)
  {
    this.value = value;
  }

  isSuccess(): this is Success<S, F>
  {
    return true;
  }

  isFailure(): this is Success<S, F>
  {
    return false;
  }

  getValue(): S
  {
    return this.value;
  }

  getError(): F
  {
    throw new Error('InvalidOperation: A result cannot be successful and contain an error');
  }
}

export class Failure<S, F> implements ResultFromEither
{
  private readonly value: F;

  constructor(value: F)
  {
    this.value = value;
  }

  isSuccess(): this is Success<S, F>
  {
    return false;
  }

  isFailure(): this is Failure<S, F>
  {
    return true;
  }

  getValue(): S
  {
    throw new Error('InvalidOperation: A result cannot be an error and contain an success');
  }

  getError(): F
  {
    return this.value;
  }
}

export const success = <S, F>(s: S): Either<S, F> =>
{
  return new Success<S, F>(s);
};

export const failure = <S, F>(f: F): Either<S, F> =>
{
  return new Failure<S, F>(f);
};


export function combineResults(results: ResultFromEither[]): ResultFromEither[]
{
  const failureArray: ResultFromEither[] = [];

  results.map((item: ResultFromEither) =>
  {
    if (item.isFailure())
    {
      failureArray.push(item);
    }
  });

  return failureArray;
}
