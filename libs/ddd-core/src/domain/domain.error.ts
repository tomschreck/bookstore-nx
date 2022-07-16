export interface IDomainError {
  message: string;
  error?: Error;
  errorType?: string;
  details?: string;
}

export abstract class DomainError implements IDomainError {
  public readonly message: string;
  public readonly error: Error;
  public readonly errorType: string;
  public readonly details: string;

  constructor
    (
      message: string,
      error?: Error,
      errorType?: string,
      details?: string
    ) {
    this.message = message;
    this.error = error || new Error();
    this.errorType = errorType;
    this.details = details;
  }
}
