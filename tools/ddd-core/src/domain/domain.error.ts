import { ValidationError } from 'class-validator';

export class AggregateError extends Error {
  private errorArray: ValidationError[];
  operationErrorMessage: string;

  constructor(errors: ValidationError[], operationErrorMessage: string) {
    if (!Array.isArray(errors)) {
      throw new TypeError(`Expected input to be an Array, got ${typeof errors}`);
    }

    const messageCombined: string = errors.map((error: ValidationError) => error.toString(true)).join('\n');

    super(messageCombined);

    this.errorArray = errors;
    this.operationErrorMessage = operationErrorMessage;
  }

  get errors(): ValidationError[] {
    return this.errorArray.slice();
  }

  get errorCount(): number {
    return this.errorArray ? this.errorArray.length : 0;
  }
}
