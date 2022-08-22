import { UniqueEntityID } from '@bookstore-nx/ddd-core';
import { expect } from 'chai';
import { BookDataEntryDto } from '../shared';
import { BookAggregate, BookAggregateResult } from './book.aggregate';
import { Book, BookError } from './book.entity';
import { ISBN, ISBNError } from './isbn.vo';

describe('book aggregate', () =>
{
  const book_entity_id: string = '94caacb4-6593-4258-9420-8d020f0b6a8e';
  const isbn_good: string = 'ISBN 978-0-596-52068-7';
  const isbn_bad: string = 'fred';

  describe('good book entity', () =>
  {
    const goodBookEntity: BookDataEntryDto = {
      title: 'The Age of Wrath',
      author: 'Abraham Eraly',
      isbn: isbn_good,
      category: 'nonfiction',
      status: 'open',
      price: 23.34,
      inventory: 9,
      notes: 'some notes'
    };

    it('should not be null', () =>
    {
      // ARRANGE
      const result: BookAggregateResult = BookAggregate.create(goodBookEntity);

      // ACT
      // ASSERT
      expect(result).to.not.be.null;
    });

    it('should be a success', () =>
    {
      // ARRANGE
      const result: BookAggregateResult = BookAggregate.create(goodBookEntity);

      // ACT
      // ASSERT
      expect(result.isSuccess()).to.be.true;
    });

    it('should surface BookAggregate', () =>
    {
      // ARRANGE
      const result: BookAggregateResult = BookAggregate.create(goodBookEntity);

      // ACT
      const bookAggregate: BookAggregate = result.getValue();

      // ASSERT
      expect(bookAggregate).to.be.instanceOf(BookAggregate);
    });

    it(`ISBN value should be ${isbn_good}`, () =>
    {
      // ARRANGE
      const result: BookAggregateResult = BookAggregate.create(goodBookEntity);

      // ACT
      const bookAggregate: BookAggregate = result.getValue();
      const book: Book = bookAggregate.book;
      const isbn: ISBN = book.isbn;

      // ASSERT
      expect(isbn.value).to.equal(isbn_good);
    });

    it(`Book id value should be ${book_entity_id}`, () =>
    {
      // ARRANGE
      const bookDataEntryDto: BookDataEntryDto = {
        id: book_entity_id,
        title: 'The Age of Wrath',
        author: 'Abraham Eraly',
        isbn: isbn_good,
        category: 'nonfiction',
        status: 'open',
        price: 23.34,
        inventory: 9,
        notes: 'some notes'
      };

      const result: BookAggregateResult = BookAggregate.create(bookDataEntryDto, UniqueEntityID.create(book_entity_id));

      // ACT
      const bookAggregate: BookAggregate = result.getValue();
      const book: Book = bookAggregate.book;

      // ASSERT
      expect(book.id.toString()).to.equal(book_entity_id);
    });

    it(`Book props id value should be ${book_entity_id}`, () =>
    {
      // ARRANGE
      const bookDataEntryDto: BookDataEntryDto = {
        id: book_entity_id,
        title: 'The Age of Wrath',
        author: 'Abraham Eraly',
        isbn: isbn_good,
        category: 'nonfiction',
        status: 'open',
        price: 23.34,
        inventory: 9,
        notes: 'some notes'
      };

      const result: BookAggregateResult = BookAggregate.create(bookDataEntryDto);

      // ACT
      const bookAggregate: BookAggregate = result.getValue();
      const book: Book = bookAggregate.book;

      // ASSERT
      expect(book.props.id).to.equal(book_entity_id);
    });
  });

  describe('bad book entity with missing title', () =>
  {
    const badBookEntity: BookDataEntryDto = {
      title: undefined,
      author: 'Abraham Eraly',
      isbn: isbn_good,
      category: 'nonfiction',
      status: 'open',
      price: 23.34,
      inventory: 9,
      notes: 'some notes'
    };

    it('should not be null', () =>
    {
      // ARRANGE
      const result: BookAggregateResult = BookAggregate.create(badBookEntity);

      // ACT
      // ASSERT
      expect(result).to.not.be.null;
    });

    it('should be a failure', () =>
    {
      // ARRANGE
      const result: BookAggregateResult = BookAggregate.create(badBookEntity);

      // ACT

      // ASSERT
      expect(result.isFailure()).to.be.true;
    });

    it('should surface BookError', () =>
    {
      // ARRANGE
      const result: BookAggregateResult = BookAggregate.create(badBookEntity);

      // ACT

      // ASSERT
      expect(result.getError()).to.be.instanceOf(BookError);
    });

    it(`error message should be 'title is null or undefined'`, () =>
    {
      // ARRANGE
      const result: BookAggregateResult = BookAggregate.create(badBookEntity);

      // ACT

      // ASSERT
      expect(result.getError().message).to.equal('title is null or undefined');
    });

    it(`errorType should be 'BOOK ENTITY ERROR'`, () =>
    {
      // ARRANGE
      const result: BookAggregateResult = BookAggregate.create(badBookEntity);

      // ACT

      // ASSERT
      expect(result.getError().errorType).to.equal('BOOK ENTITY ERROR');
    });
  });

  describe('bad book entity with missing author', () =>
  {
    const badBookEntity: BookDataEntryDto = {
      title: 'The Age of Wrath',
      author: undefined,
      isbn: isbn_good,
      category: 'nonfiction',
      status: 'open',
      price: 23.34,
      inventory: 9,
      notes: 'some notes'
    };

    it('should not be null', () =>
    {
      // ARRANGE
      const result: BookAggregateResult = BookAggregate.create(badBookEntity);

      // ACT
      // ASSERT
      expect(result).to.not.be.null;
    });

    it('should be a failure', () =>
    {
      // ARRANGE
      const result: BookAggregateResult = BookAggregate.create(badBookEntity);

      // ACT

      // ASSERT
      expect(result.isFailure()).to.be.true;
    });

    it('should surface BookError', () =>
    {
      // ARRANGE
      const result: BookAggregateResult = BookAggregate.create(badBookEntity);

      // ACT

      // ASSERT
      expect(result.getError()).to.be.instanceOf(BookError);
    });

    it(`error message should be 'author is null or undefined'`, () =>
    {
      // ARRANGE
      const result: BookAggregateResult = BookAggregate.create(badBookEntity);

      // ACT

      // ASSERT
      expect(result.getError().message).to.equal('author is null or undefined');
    });

    it(`errorType should be 'BOOK ENTITY ERROR'`, () =>
    {
      // ARRANGE
      const result: BookAggregateResult = BookAggregate.create(badBookEntity);

      // ACT

      // ASSERT
      expect(result.getError().errorType).to.equal('BOOK ENTITY ERROR');
    });
  });

  describe('bad book entity with missing ISBN', () =>
  {
    const badBookEntity: BookDataEntryDto = {
      title: 'The Age of Wrath',
      author: 'Abraham Eraly',
      isbn: undefined,
      category: 'nonfiction',
      status: 'open',
      price: 23.34,
      inventory: 9,
      notes: 'some notes'
    };

    it('should not be null', () =>
    {
      // ARRANGE
      const result: BookAggregateResult = BookAggregate.create(badBookEntity);

      // ACT
      // ASSERT
      expect(result).to.not.be.null;
    });

    it('should be a failure', () =>
    {
      // ARRANGE
      const result: BookAggregateResult = BookAggregate.create(badBookEntity);

      // ACT

      // ASSERT
      expect(result.isFailure()).to.be.true;
    });

    it('should surface ISBNError', () =>
    {
      // ARRANGE
      const result: BookAggregateResult = BookAggregate.create(badBookEntity);

      // ACT

      // ASSERT
      expect(result.getError()).to.be.instanceOf(ISBNError);
    });

    it(`error message should be 'isbn is null or undefined'`, () =>
    {
      // ARRANGE
      const result: BookAggregateResult = BookAggregate.create(badBookEntity);

      // ACT

      // ASSERT
      expect(result.getError().message).to.equal('isbn is null or undefined');
    });

    it(`errorType should be 'ISBN ERROR'`, () =>
    {
      // ARRANGE
      const result: BookAggregateResult = BookAggregate.create(badBookEntity);

      // ACT

      // ASSERT
      expect(result.getError().errorType).to.equal('ISBN ERROR');
    });
  });

  describe('bad book entity with bad ISBN value', () =>
  {
    const badBookEntity: BookDataEntryDto = {
      title: 'The Age of Wrath',
      author: 'Abraham Eraly',
      isbn: isbn_bad,
      category: 'nonfiction',
      status: 'open',
      price: 23.34,
      inventory: 9,
      notes: 'some notes'
    };

    it('should not be null', () =>
    {
      // ARRANGE
      const result: BookAggregateResult = BookAggregate.create(badBookEntity);

      // ACT
      // ASSERT
      expect(result).to.not.be.null;
    });

    it('should be a failure', () =>
    {
      // ARRANGE
      const result: BookAggregateResult = BookAggregate.create(badBookEntity);

      // ACT

      // ASSERT
      expect(result.isFailure()).to.be.true;
    });

    it('should surface ISBNError', () =>
    {
      // ARRANGE
      const result: BookAggregateResult = BookAggregate.create(badBookEntity);

      // ACT

      // ASSERT
      expect(result.getError()).to.be.instanceOf(ISBNError);
    });

    it(`error message should be 'isbn is not formatted correctly'`, () =>
    {
      // ARRANGE
      const result: BookAggregateResult = BookAggregate.create(badBookEntity);

      // ACT

      // ASSERT
      expect(result.getError().message).to.equal('isbn is not formatted correctly');
    });

    it(`errorType should be 'ISBN ERROR'`, () =>
    {
      // ARRANGE
      const result: BookAggregateResult = BookAggregate.create(badBookEntity);

      // ACT

      // ASSERT
      expect(result.getError().errorType).to.equal('ISBN ERROR');
    });
  });
});
