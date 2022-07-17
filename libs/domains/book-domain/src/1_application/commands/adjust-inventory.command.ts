import { CommandBase } from '@bookstore-nx/ddd-core';
import { AdjustInventoryDto, BookDataEntryDto } from '../../shared';


export class AdjustInventoryCommand extends CommandBase<AdjustInventoryDto>
{
  private _bookDataEntryDto: BookDataEntryDto;

  get adjustInventoryDto(): AdjustInventoryDto
  {
    return this.props;
  }

  get bookDataEntryDto(): BookDataEntryDto
  {
    return this._bookDataEntryDto;
  }


  private constructor(props: AdjustInventoryDto, bookDataEntryDto: BookDataEntryDto)
  {
    super(props);
    this._bookDataEntryDto = bookDataEntryDto;
  }

  static create(props: AdjustInventoryDto, bookDataEntryDto: BookDataEntryDto): AdjustInventoryCommand
  {
    return new AdjustInventoryCommand(props, bookDataEntryDto);
  }
}
