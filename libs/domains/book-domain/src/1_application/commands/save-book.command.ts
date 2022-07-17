import { CommandBase } from '@bookstore-nx/ddd-core';
import { BookDataEntryDto } from '../../shared';


export class SaveBookCommand extends CommandBase<BookDataEntryDto> {
  get bookDataEntryDto(): BookDataEntryDto
  {
    return this.props;
  }

  private constructor(props: BookDataEntryDto)
  {
    super(props);
  }

  static create(props: BookDataEntryDto): SaveBookCommand
  {
    return new SaveBookCommand(props);
  }
}
