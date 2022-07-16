export class Identifier<T>
{
  private _isNewIdentifier = false;

  public get isNewIdentifier(): boolean
  {
    return this._isNewIdentifier;
  }

  constructor(private value: T, isNewIdentifier: boolean)
  {
    this.value = value;
    this._isNewIdentifier = isNewIdentifier;
  }

  equals(id?: Identifier<T>): boolean
  {
    if (id === null || id === undefined)
    {
      return false;
    }
    if (!(id instanceof this.constructor))
    {
      return false;
    }

    return (id.toValue() === this.value);
  }

  toString()
  {
    return String(this.value);
  }

  /**
   * Return raw value of identifier
   */
  toValue(): T
  {
    return this.value;
  }
}
