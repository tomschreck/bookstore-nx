import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookAdminService } from './book-admin.service';
import { AdjustInventoryInput, CreateBookInput, UpdateBookInput } from './dto';

@Resolver('BookAdmin')
export class BookAdminResolver
{
  constructor(private readonly bookAdminService: BookAdminService) { }

  @Query('book')
  findAll()
  {
    return this.bookAdminService.findAll();
  }

  @Query('book')
  findOne(@Args('id') id: string)
  {
    return this.bookAdminService.findOne(id);
  }


  @Mutation('createBook')
  create(@Args('createBookInput') createBookInput: CreateBookInput)
  {
    return this.bookAdminService.create(createBookInput);
  }

  @Mutation('updateBook')
  update(@Args('updateBookInput') updateBookInput: UpdateBookInput)
  {
    return this.bookAdminService.update(updateBookInput);
  }

  @Mutation('adjustInventory')
  adjustInventory(@Args('adjustInventoryInput') adjustInventoryInput: AdjustInventoryInput)
  {
    return this.bookAdminService.adjustInventory(adjustInventoryInput);
  }

  @Mutation('removeBook')
  remove(@Args('id') id: string)
  {
    return this.bookAdminService.remove(id);
  }
}
