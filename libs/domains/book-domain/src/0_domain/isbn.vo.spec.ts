import { expect } from 'chai';
import { CONFIG } from '../domain.config';
import { ISBN, ISBNError, ISBNResult } from './isbn.vo';

describe('isbn value object', () =>
{
  const isbn_good: string = 'ISBN 978-0-596-52068-7';
  const isbn_bad: string = 'fred';
  const regex: RegExp = new RegExp(CONFIG.REGEX.ISBN);

  describe('regex result', () =>
  {
    it('should not be null', () =>
    {
      // ARRANGE
      const result: boolean = regex.test(isbn_good);

      // ACT

      // ASSERT
      expect(result).to.not.be.null;
    });

    it(`${isbn_good} should be true`, () =>
    {
      // ARRANGE
      const result: boolean = regex.test(isbn_good);

      // ACT

      // ASSERT
      expect(result).to.be.true;
    });

    it(`${isbn_bad} should be false`, () =>
    {
      // ARRANGE
      const result: boolean = regex.test(isbn_bad);

      // ACT

      // ASSERT
      expect(result).to.be.false;
    });

  });

  describe('good isbn value', () =>
  {
    it('should not be null', () =>
    {
      // ARRANGE
      const result: ISBNResult = ISBN.create(isbn_good);

      // ACT

      // ASSERT
      expect(result).to.not.be.null;
    });

    it('should be a success', () =>
    {
      // ARRANGE
      const result: ISBNResult = ISBN.create(isbn_good);

      // ACT

      // ASSERT
      expect(result.isSuccess()).to.be.true;
    });

    it('should surface ISBN', () =>
    {
      // ARRANGE
      const result: ISBNResult = ISBN.create(isbn_good);

      // ACT
      const isbn: ISBN = result.getValue();

      // ASSERT
      expect(isbn).to.be.instanceOf(ISBN);
    });

    it(`should be ${isbn_good}`, () =>
    {
      // ARRANGE
      const result: ISBNResult = ISBN.create(isbn_good);

      // ACT
      const isbn: ISBN = result.getValue();

      // ASSERT
      expect(isbn.value).to.equal(isbn_good);
    });
  });

  describe('bad isbn value', () =>
  {
    it('should not be null', () =>
    {
      // ARRANGE
      const result: ISBNResult = ISBN.create(isbn_bad);

      // ACT

      // ASSERT
      expect(result).to.not.be.null;
    });

    it('should be a failure', () =>
    {
      // ARRANGE
      const result: ISBNResult = ISBN.create(isbn_bad);

      // ACT

      // ASSERT
      expect(result.isFailure()).to.be.true;
    });

    it('should surface ISBNError', () =>
    {
      // ARRANGE
      const result: ISBNResult = ISBN.create(isbn_bad);

      // ACT

      // ASSERT
      expect(result.getError()).to.be.instanceOf(ISBNError);
    });
  });
});
