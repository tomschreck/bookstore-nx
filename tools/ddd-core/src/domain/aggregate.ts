import { AggregateRoot } from '@nestjs/cqrs';
import { UniqueEntityID } from './unique-entity-id';

export abstract class Aggregate<T> extends AggregateRoot {
  protected readonly _id: UniqueEntityID;
  public readonly props: T;

  get id(): UniqueEntityID {
    return this._id;
  }

  get isNewAggregate(): boolean {
    return this._id.isNewIdentifier;
  }

  constructor(props: T, id?: UniqueEntityID) {
    super();
    this._id = id ? id : UniqueEntityID.create();
    this.props = props;
  }
}
