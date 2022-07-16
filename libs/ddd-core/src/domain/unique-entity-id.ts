import { v4 as uuidv4 } from 'uuid';
import { Identifier } from './identifier';


export class UniqueEntityID extends Identifier<string | number>
{
  private constructor(id?: string | number) {
    super(UniqueEntityID.idOrDefaultId(id), UniqueEntityID.isNewIdGenerated(id));
  }

  public static create(id?: string | number): UniqueEntityID {
    return new UniqueEntityID(id);
  }

  private static idOrDefaultId(id?: string | number): string | number {
    return (id) ? id : uuidv4();
  }

  private static isNewIdGenerated(id?: string | number): boolean {
    return ((id === undefined) || (id === null));
  }
}
