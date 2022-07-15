import { ICommand } from '@nestjs/cqrs';


export abstract class CommandBase<T> implements ICommand {
  public readonly props: T;

  constructor(props: T) {
    this.props = props;
  }
}
