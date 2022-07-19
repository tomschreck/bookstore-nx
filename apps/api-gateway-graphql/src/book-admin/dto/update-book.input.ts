import { PartialType } from '@nestjs/mapped-types';
import { CreateBookInput } from './create-book.input';

export class UpdateBookInput extends PartialType(CreateBookInput)
{
  id: string;
}
