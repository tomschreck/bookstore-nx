import { IQuery } from '@nestjs/cqrs';

export abstract class QueryBase<T> implements IQuery {
  public readonly props: T;

  constructor(props: T) {
    this.props = props;
  }
}
