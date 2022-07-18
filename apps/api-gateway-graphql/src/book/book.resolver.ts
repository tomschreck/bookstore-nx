import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookService } from './book.service';
import { AdjustInventoryInput, CreateBookInput, UpdateBookInput } from './dto';

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
  create(@Args('createBookInput') createBookInput: CreateBookInput)
  {
    return this.bookService.create(createBookInput);
  }

  @Mutation('updateBook')
  update(@Args('updateBookInput') updateBookInput: UpdateBookInput)
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
