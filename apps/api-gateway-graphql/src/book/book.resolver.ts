import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookService } from './book.service';
import { AdjustInventoryInput, BookInput } from './dto';

@Resolver('Book')
export class BookResolver
{
  constructor(private readonly bookService: BookService) { }

  @Query('book')
  findAll()
  {
    return this.bookService.findAll();
  }

  @Query('book')
  findOne(@Args('id') id: string)
  {
    return this.bookService.findOne(id);
  }


  @Mutation('createBook')
  create(@Args('createBookInput') createBookInput: BookInput)
  {
    return this.bookService.create(createBookInput);
  }

  @Mutation('updateBook')
  update(@Args('updateBookInput') updateBookInput: BookInput)
  {
    return this.bookService.update(updateBookInput);
  }

  @Mutation('adjustInventory')
  adjustInventory(@Args('adjustInventoryInput') adjustInventoryInput: AdjustInventoryInput)
  {
    return this.bookService.adjustInventory(adjustInventoryInput);
  }

  @Mutation('removeBook')
  remove(@Args('id') id: string)
  {
    return this.bookService.remove(id);
  }
}
