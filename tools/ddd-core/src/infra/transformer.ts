export abstract class Transformer<TFrom, TTo> {
  abstract transform(from: TFrom): Promise<TTo>;

  async transformMany(from?: TFrom[]): Promise<TTo[]> {
    if (!from) return [];

    const many: TTo[] = [];

    for (const item of from) {
      const b: TTo = await this.transform(item);
      many.push(b);
    }

    return many;
  }
}
