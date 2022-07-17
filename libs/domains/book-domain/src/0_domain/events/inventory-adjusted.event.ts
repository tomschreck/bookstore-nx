import { BookDataEntryDto } from '../../shared';
import { BookEventBase } from './book-event';

export class InventoryAdjustedEvent extends BookEventBase
{
  private constructor(props: BookDataEntryDto)
  {
    super(props);
  }

  static create(props: BookDataEntryDto): InventoryAdjustedEvent
  {
    return new InventoryAdjustedEvent(props);
  }
}
