import { v4 as uuidv4 } from 'uuid';

export class Identifier<T> {
  private _value: T | string;
  private _isNewIdentifier = false;

  get value(): T | string {
    return this._value;
  }

  get isNewIdentifier(): boolean {
    return this._isNewIdentifier;
  }

  constructor(value?: T, isNewIdentifier?: boolean) {
    this._value = value || uuidv4();
    this._isNewIdentifier = isNewIdentifier ? isNewIdentifier : value === undefined || value === null;
  }

  equals(id?: Identifier<T>): boolean {
    if (id === null || id === undefined) {
      return false;
    }
    if (!(id instanceof this.constructor)) {
      return false;
    }

    return id.value === this.value;
  }

  toString() {
    return String(this.value);
  }
}
