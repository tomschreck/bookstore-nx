import { CommandBase } from '@bookstore-nx/ddd-core';
import { BookDataEntryDto } from '../../shared';


export class CreateBookCommand extends CommandBase<BookDataEntryDto> {
  get bookDataEntryDto(): BookDataEntryDto
  {
    return this.props;
  }

  private constructor(props: BookDataEntryDto)
  {
    super(props);
  }

  static create(props: BookDataEntryDto): CreateBookCommand
  {
    return new CreateBookCommand(props);
  }
}
