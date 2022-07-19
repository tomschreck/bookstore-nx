import { SearchDto } from '@bookstore-nx/domains/book-domain';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { WebPortalService } from './web-portal.service';

@Resolver('webportal')
export class WebPortalResolver
{
  constructor(private readonly webPortalService: WebPortalService) { }

  @Query('bookDetails')
  findOne(@Args('id') id: string)
  {
    return this.webPortalService.findOne(id);
  }

  @Query('search')
  findMany(@Args('input') input: SearchDto)
  {
    return this.webPortalService.findMany(input);
  }

}
