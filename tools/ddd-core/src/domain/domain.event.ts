import { IEvent } from '@nestjs/cqrs';

export class DomainEvent<T> implements IEvent {
  readonly props: T;
  readonly version: number;

  constructor(props: T, version?: number) {
    this.props = props;
    this.version = version || 1;
  }
}
