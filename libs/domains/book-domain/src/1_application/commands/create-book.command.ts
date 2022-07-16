import { CommandBase } from '@bookstore-nx/ddd-core';
import { CreateBookDto } from '../../shared';


export class CreateBookCommand extends CommandBase<CreateBookDto> {
  get createBookDto(): CreateBookDto
  {
    return this.props;
  }

  private constructor(props: CreateBookDto)
  {
    super(props);
  }

  static create(props: CreateBookDto): CreateBookCommand
  {
    return new CreateBookCommand(props);
  }
}
