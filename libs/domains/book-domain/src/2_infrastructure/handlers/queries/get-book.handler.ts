import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetBookQuery } from '../../../1_application';
import { BookReadOnlyEntity, BookReadOnlyRepository } from '../../repos';


@QueryHandler(GetBookQuery)
export class GetBookQueryHandler implements IQueryHandler<GetBookQuery, BookReadOnlyEntity> {

  constructor(
    private readonly bookReadOnlyRepository: BookReadOnlyRepository,
  ) { }

  execute(query: GetBookQuery): Promise<BookReadOnlyEntity>
  {
    return this.bookReadOnlyRepository.findOneBy({ id: query.id });
  }
}
