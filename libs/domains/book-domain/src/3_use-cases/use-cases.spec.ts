import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { expect } from 'chai';
import { DataSource, Repository } from 'typeorm';
import { BookEntity, BookReadOnlyEntity } from '../2_infrastructure';
import { BookDataEntryDto, BookDto, BookForWebDto } from '../shared';
import { CreateBookUseCase } from './create-book.use-case';
import { GetBookForWebUseCase } from './get-book-for-web.use-case';
import { GetBookUseCase } from './get-book.use-case';
import { UseCasesModule } from './use-cases.module';


describe('Use Cases', () =>
{
  let app: INestApplication;
  let dataSource: DataSource;
  let createBookUseCase: CreateBookUseCase;
  let getBookUseCase: GetBookUseCase;
  let getBookForWebUseCase: GetBookForWebUseCase;

  const book_entity_id: string = '94caacb4-6593-4258-9420-8d020f0b6a8e';
  const bookDataEntryDto: BookDataEntryDto = {
    id: book_entity_id,
    title: 'The Age of Wrath',
    author: 'Abraham Eraly',
    isbn: 'ISBN 978-0-596-52068-7',
    category: 'nonfiction',
    status: 'open',
    price: 23.34,
    inventory: 9,
    notes: 'some notes'
  };

  beforeAll(async () =>
  {
    const module = await Test.createTestingModule({
      imports: [
        UseCasesModule,
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          database: ':memory:',
          dropSchema: true,
          entities: [ BookEntity, BookReadOnlyEntity ],
          synchronize: true
        })
      ]
    }).compile();

    app = module.createNestApplication();
    await app.init();

    dataSource = module.get<DataSource>(DataSource);
    createBookUseCase = module.get<CreateBookUseCase>(CreateBookUseCase);
    getBookUseCase = module.get<GetBookUseCase>(GetBookUseCase);
    getBookForWebUseCase = module.get<GetBookForWebUseCase>(GetBookForWebUseCase);

    // SEED DATABASE WITH CREATE BOOK USE CASE FLOW
    await createBookUseCase.executeAsync(bookDataEntryDto);
  });

  afterAll(async () =>
  {
    await clearDatabase(dataSource);
    await app.close();
  });

  describe('Create Book Use Case', () =>
  {
    it('use case should not be null', async () =>
    {
      expect(createBookUseCase).to.not.be.null;
    });
  });

  describe('Get Book Use Case', () =>
  {
    let bookDto: BookDto;

    beforeAll(async () =>
    {
      bookDto = await getBookUseCase.executeAsync(book_entity_id);
    });

    it('use case should not be null', async () =>
    {
      expect(getBookUseCase).to.not.be.null;
    });

    it('bookDto should not be null', async () =>
    {
      expect(bookDto).to.not.be.null;
    });

    it(`bookDto id should equal ${book_entity_id}`, async () =>
    {
      expect(bookDto.id).to.equal(book_entity_id);
    });

    it(`bookDto title should equal '${bookDataEntryDto.title}'`, async () =>
    {
      expect(bookDto.title).to.equal(bookDataEntryDto.title);
    });

    it(`bookDto notes should equal 'some notes'`, async () =>
    {
      expect(bookDto.notes).to.equal('some notes');
    });
  });

  describe('Get Book For Web Use Case', () =>
  {
    let bookForWebDto: BookForWebDto;

    beforeAll(async () =>
    {
      bookForWebDto = await getBookForWebUseCase.executeAsync(book_entity_id);
    });

    it('use case should not be null', async () =>
    {
      expect(bookForWebDto).to.not.be.null;
    });

    it('bookForWebDto should not be null', async () =>
    {
      expect(bookForWebDto).to.not.be.null;
    });

    it(`bookForWebDto id should equal ${book_entity_id}`, async () =>
    {
      expect(bookForWebDto.id).to.equal(book_entity_id);
    });

    it(`bookForWebDto title should equal '${bookDataEntryDto.title}'`, async () =>
    {
      expect(bookForWebDto.title).to.equal(bookDataEntryDto.title);
    });

    it(`bookForWebDto should not have notes property`, async () =>
    {
      // eslint-disable-next-line no-prototype-builtins
      expect(bookForWebDto.hasOwnProperty('note')).to.be.false;
    });
  });
});




async function clearDatabase(dataSource: DataSource)
{
  await clearBookEntity(dataSource);
  await clearBookReadOnlyEntity(dataSource);
}

async function clearBookEntity(dataSource: DataSource)
{
  const repository: Repository<BookEntity> = await dataSource.manager.getRepository<BookEntity>('BookEntity');

  await repository.clear();
}

async function clearBookReadOnlyEntity(dataSource: DataSource)
{
  const repository: Repository<BookReadOnlyEntity> = await dataSource.manager.getRepository<BookReadOnlyEntity>('BookReadOnlyEntity');

  await repository.clear();
}
