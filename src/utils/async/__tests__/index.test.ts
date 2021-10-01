import { waterfallMap } from '../index';

describe('utils async', () => {
  describe('waterfallMap', () => {
    it('should execute async actions in queue', async () => {
      const array = ['string1', 'string2'];

      const mapFn = jest.fn().mockImplementation(async (string: string) => string + string);

      const result = await waterfallMap(array, mapFn);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(array[0] + array[0]);
      expect(result[1]).toEqual(array[1] + array[1]);

      expect(mapFn).toHaveBeenCalledTimes(2);
      expect(mapFn).toHaveBeenCalledWith(array[0]);
      expect(mapFn).toHaveBeenCalledWith(array[1]);
    });
  });
});
