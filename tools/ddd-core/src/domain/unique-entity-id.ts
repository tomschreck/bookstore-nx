import { Identifier } from './identifier';

export class UniqueEntityID extends Identifier<string | number> {
  private constructor(id?: string | number) {
    super(id);
  }

  public static create(id?: string | number): UniqueEntityID {
    return new UniqueEntityID(id);
  }
}
