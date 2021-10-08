export const waterfallMap = async <TInput, TOutput>(
  array: TInput[],
  mapFn: (item: TInput) => Promise<TOutput>
): Promise<TOutput[]> => {
  const result: TOutput[] = [];

  for (const item of array) {
    const mappedItem = await mapFn(item);

    result.push(mappedItem);
  }

  return result;
};
