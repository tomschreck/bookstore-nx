import { CommandBase } from '@bookstore-nx/ddd-core';
import { BookDataEntryDto } from '../../shared';


export class SaveBookCommand extends CommandBase<BookDataEntryDto> {
  private _existingBookDataEntryDto: BookDataEntryDto;

  get updatedBookDataEntryDto(): BookDataEntryDto
  {
    return this.props;
  }

  get existingBookDataEntryDto(): BookDataEntryDto
  {
    return this._existingBookDataEntryDto;
  }

  private constructor(props: BookDataEntryDto, existingBookDataEntryDto: BookDataEntryDto)
  {
    super(props);
    this._existingBookDataEntryDto = existingBookDataEntryDto;
  }

  static create(props: BookDataEntryDto, existingBookDataEntryDto: BookDataEntryDto): SaveBookCommand
  {
    return new SaveBookCommand(props, existingBookDataEntryDto);
  }
}
