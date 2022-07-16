import { IDomainError } from './domain.error';


/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IGuardResult
{
  succeeded: boolean;
  message?: string;
}

export interface IGuardArgument
{
  argument: any;
  argumentName: string;
}

export type GuardArgumentCollection = IGuardArgument[];


export class Guard
{
  public static combine(guardResults: IGuardResult[]): IGuardResult
  {
    for (const result of guardResults)
    {
      if (result.succeeded === false) { return result; }
    }

    return { succeeded: true };
  }

  public static againstNullOrUndefined(argument: any, argumentName: string): IGuardResult
  {
    if (argument === null || argument === undefined)
    {
      return { succeeded: false, message: `${argumentName} is null or undefined` };
    }
    else
    {
      return { succeeded: true };
    }
  }

  public static againstUndefined(argument: any, argumentName: string): IGuardResult
  {
    if (argument === undefined)
    {
      return { succeeded: false, message: `${argumentName} undefined` };
    }
    else
    {
      return { succeeded: true };
    }
  }

  public static againstEmptyArray(argument: any[], argumentName: string): IGuardResult
  {
    if (argument !== null && argument !== undefined && Array.isArray(argument) && arguments.length > 0)
    {
      return { succeeded: true };
    }
    else
    {
      return { succeeded: false, message: `${argumentName} is not a populated array` };
    }
  }

  public static againstNullOrUndefinedBulk(args: GuardArgumentCollection): IGuardResult
  {
    for (const arg of args)
    {
      const result = this.againstNullOrUndefined(arg.argument, arg.argumentName);
      if (!result.succeeded) { return result; }
    }

    return { succeeded: true };
  }

  public static againstUndefinedBulk(args: GuardArgumentCollection): IGuardResult
  {
    for (const arg of args)
    {
      const result = this.againstUndefined(arg.argument, arg.argumentName);
      if (!result.succeeded) { return result; }
    }

    return { succeeded: true };
  }

  public static isOneOf(value: any, validValues: any[], argumentName: string): IGuardResult
  {
    let isValid = false;

    for (const validValue of validValues)
    {
      if (value === validValue)
      {
        isValid = true;
      }
    }

    if (isValid)
    {
      return { succeeded: true };
    }
    else
    {
      return {
        succeeded: false,
        message: `${argumentName} isn't oneOf the correct types in ${JSON.stringify(validValues)}. Got "${value}".`
      };
    }
  }

  public static inRange(num: number, min: number, max: number, argumentName: string): IGuardResult
  {
    const isInRange = num >= min && num <= max;

    if (!isInRange)
    {
      return { succeeded: false, message: `${argumentName} (${num}) is not within range from ${min} to ${max}.` };
    }
    else
    {
      return { succeeded: true };
    }
  }

  public static isGreaterThanOrEqualTo(num: number, compareTo: number, argumentName: string): IGuardResult
  {
    const isGreaterThanOrEqualTo: boolean = num >= compareTo;

    if (!isGreaterThanOrEqualTo)
    {
      return { succeeded: false, message: `${argumentName} (${num}) is not greater than or equal to ${compareTo}.` };
    }

    return { succeeded: true };
  }

  public static isGreaterThan(num: number, compareTo: number, argumentName: string): IGuardResult
  {
    const isGreaterThanOrEqualTo: boolean = num > compareTo;

    if (!isGreaterThanOrEqualTo)
    {
      return { succeeded: false, message: `${argumentName} (${num}) is not greater than ${compareTo}.` };
    }

    return { succeeded: true };
  }

  public static isLessThanOrEqualTo(num: number, compareTo: number, argumentName: string): IGuardResult
  {
    const isLessThanOrEqualTo: boolean = num <= compareTo;

    if (!isLessThanOrEqualTo)
    {
      return { succeeded: false, message: `${argumentName} (${num}) is not less than or equal to ${compareTo}.` };
    }

    return { succeeded: true };
  }

  public static isLessThan(num: number, compareTo: number, argumentName: string): IGuardResult
  {
    const isLessThan: boolean = num < compareTo;

    if (!isLessThan)
    {
      return { succeeded: false, message: `${argumentName} (${num}) is not less than ${compareTo}.` };
    }

    return { succeeded: true };
  }

  public static allInRange(numbers: number[], min: number, max: number, argumentName: string): IGuardResult
  {
    let isFailingResult = false;

    for (const num of numbers)
    {
      const numIsInRangeResult = this.inRange(num, min, max, argumentName);

      if (!numIsInRangeResult.succeeded)
      {
        isFailingResult = !numIsInRangeResult.succeeded;
        break;
      }
    }

    if (isFailingResult)
    {
      return { succeeded: false, message: `${argumentName} is not within the range.` };
    }
    else
    {
      return { succeeded: true };
    }
  }

  public static passesRegex(argument: any, argumentName: string, regExToTest: string): IGuardResult
  {
    const regex = new RegExp(regExToTest);
    const hasPassed: boolean = regex.test(argument);

    if (!hasPassed)
    {
      return { succeeded: false, message: `${argumentName} is not formatted correctly` };
    }
    else
    {
      return { succeeded: true };
    }
  }

  public static domainError(error: string | IDomainError): IGuardResult
  {
    const errorMessage: string = (typeof error === 'string') ? error : error.message;

    return { succeeded: false, message: errorMessage };
  }
}
