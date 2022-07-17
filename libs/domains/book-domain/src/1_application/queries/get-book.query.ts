import { QueryBase } from '@bookstore-nx/ddd-core';


export class GetBookQuery extends QueryBase<string>
{
  public id: string;

  private constructor(props: string)
  {
    super(props);
    this.id = props;
  }

  static create(payload: string): GetBookQuery
  {
    return new GetBookQuery(payload);
  }
}
