import { UniqueEntityID } from './unique-entity-id';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntity = (v: any): v is Entity<any> =>
{
  return v instanceof Entity;
};

export abstract class Entity<T>
{
  protected readonly _id: UniqueEntityID;
  public readonly props: T;

  get id(): UniqueEntityID
  {
    return this._id;
  }

  constructor(props: T, id?: UniqueEntityID)
  {
    this._id = id ? id : UniqueEntityID.create();
    this.props = props;
  }

  public equals(object?: Entity<T>): boolean
  {

    if (object == null || object == undefined)
    {
      return false;
    }

    if (this === object)
    {
      return true;
    }

    if (!isEntity(object))
    {
      return false;
    }

    return this._id.equals(object._id);
  }
}
