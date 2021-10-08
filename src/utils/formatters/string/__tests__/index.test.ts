import { toAlphaNumeric } from '../index';

describe('utils formatters string', () => {
  describe('toAlphaNumeric', () => {
    it.each([
      ['test', 'test', ''],
      ['test123', 'test123', ''],
      ['test123', 'test123', '-'],
      ['test_123', 'test-123', '_'],
      ['test_123_', 'test!*/123+', '_'],
      ['test123', 'test+123', undefined],
      ['test123', '---test+123', undefined],
      ['+test+123', '---test+123', '+'],
    ])(
      'should return %p when input is %p and replaceValue is %p',
      (expected, input, replaceValue) => {
        const result = toAlphaNumeric(input, replaceValue);

        expect(expected).toEqual(result);
      }
    );
  });
});
