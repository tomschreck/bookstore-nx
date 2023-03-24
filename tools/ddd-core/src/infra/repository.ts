export interface IRepository<TModel> {
  findOneById(id: string): Promise<TModel | null>;
  findOneByIdOrFail(id: string): Promise<TModel>;
  saveBatch(input: TModel[]): Promise<void>;
  saveOne(input: TModel): Promise<void>;
}
