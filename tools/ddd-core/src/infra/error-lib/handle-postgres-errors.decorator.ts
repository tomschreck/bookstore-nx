/* eslint-disable @typescript-eslint/no-explicit-any */
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { RepoDuplicateError, RepoEntityNotFoundError, RepoError, RepoValidationError } from './repo.errors';

import { PostgresErrorCodes } from './postgres-error-codes';

export const HandlePostgresErrors = () => {
  return (_target: any, _propertyName: any, descriptor: any) => {
    const method = descriptor.value;

    descriptor.value = async function (...args: any) {
      try {
        return await method.apply(this, args);
      } catch (error) {
        if (error instanceof Error) {
          handleError(error);
        } else if (error instanceof EntityNotFoundError) {
          throw error;
        } else {
          throw new RepoError(`Unknown Error: ${JSON.stringify(error)}`);
        }
      }
    };
  };
};

const handleError = (error: Error) => {
  if (error instanceof QueryFailedError) {
    // ? Postgres Error codes: https://www.postgresql.org/docs/13/errcodes-appendix.html

    if (error.driverError?.code === PostgresErrorCodes.UNIQUE_CONSTRAINT) {
      // 23505 === Violates duplicate constraint
      throw new RepoDuplicateError(`Duplicate policy found ${error.message}`);
    } else if (error.driverError?.code?.substring(0, 2) === '22') {
      // Covers data exceptions (22XXX) which indicate invalid input
      throw new RepoValidationError(`Invalid fields for policy ${error.message}`);
    } else {
      // These Errors shouldn't happen under normal conditions
      throw new RepoError(`Unknown Database Error: ${error.message}`);
    }
  }

  if (error instanceof EntityNotFoundError) {
    throw new RepoEntityNotFoundError(`Entity not found: ${error.message}`);
  } else if (error instanceof RepoError) {
    throw error; // Will be handled by external error handler
  } else {
    throw new RepoError(`Unknown Error: ${error.message}`);
  }
};
