import { Identifier } from './identifier';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntity = (v: any): v is DomainEntity<any, any> => {
  return v instanceof DomainEntity;
};

export abstract class DomainEntity<TProps, TIdentifier extends Identifier<string | number>> {
  public readonly props: TProps;
  public readonly _id: TIdentifier;

  get entityIdentifier(): TIdentifier {
    return this._id;
  }

  constructor(props: TProps, id: TIdentifier) {
    this.props = props;
    this._id = id;
  }

  public equals(object?: DomainEntity<TProps, TIdentifier>): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this._id === object._id;
  }
}
