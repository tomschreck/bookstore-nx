export interface IUseCase<TInput, TOutput>
{
  executeAsync(input: TInput): Promise<TOutput> | TOutput;
}
