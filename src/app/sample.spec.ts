import { someAwesomeFunction } from '@app/index';

describe(' a sample test suite', () => {
  it('should pass', () => {
    expect(true).toEqual(true);
  });

  describe('someAwesomeFunction', () => {
    it('should run fine without throwing an error', () => {
      expect(someAwesomeFunction).not.toThrow();
    });
  });
});
