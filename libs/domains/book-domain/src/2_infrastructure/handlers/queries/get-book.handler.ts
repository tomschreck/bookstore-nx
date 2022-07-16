import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { GetBookQuery } from '../../../1_application';
import { BookReadOnlyEntity, BookReadOnlyRepository } from '../../repos';


@QueryHandler(GetBookQuery)
export class GetBookQueryHandler implements ICommandHandler<GetBookQuery> {

  constructor(
    private readonly bookReadOnlyRepository: BookReadOnlyRepository,
  ) { }

  execute(command: GetBookQuery): Promise<BookReadOnlyEntity>
  {
    return this.bookReadOnlyRepository.findOneBy({ id: command.id });
  }
}
