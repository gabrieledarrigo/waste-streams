import { validateSync, ValidationError } from 'class-validator';
import { PickUpQuery } from '../../../src/streams/dto/pickup-query';

const isValid = (errors: ValidationError[]) => errors.length === 0;

describe('PickUpQuery', () => {
  describe('postalcode', () => {
    it.each([
      [1000, true],
      [1100, true],
      [9999, true],
      [999, false],
      [1000.5, false],
      [10000, false],
    ])(
      'should acceot a valid Dutch postal code in the range 1000 - 9999. Actual: %i. Is valid: %s',
      async (postalcode, expected) => {
        const query = new PickUpQuery();
        query.postalcode = postalcode;

        expect(isValid(validateSync(query))).toBe(expected);
      },
    );
  });

  describe('weekdays', () => {
    it.each([
      ['Monday', ['monday', 'monday-1st', 'monday-2nd', 'monday-3rd', 'monday-4th']],
      ['Tuesday', ['tuesday', 'tuesday-1st', 'tuesday-2nd', 'tuesday-3rd', 'tuesday-4th']],
      ['Wednesday', ['wednesday', 'wednesday-1st', 'wednesday-2nd', 'wednesday-3rd', 'wednesday-4th']],
      ['Thursday', ['thursday', 'thursday-1st', 'thursday-2nd', 'thursday-3rd', 'thursday-4th']],
      ['Friday', ['friday', 'friday-1st', 'friday-2nd', 'friday-3rd', 'friday-4th']],
      ['Saturday', ['saturday', 'saturday-1st', 'saturday-2nd', 'saturday-3rd', 'saturday-4th']],
      ['Sunday', ['sunday', 'sunday-1st', 'sunday-2nd', 'sunday-3rd', 'sunday-4th']],
    ])('should accept one or more weekday for: %s in the form of %s', (_, weekdays) => {
      const query = new PickUpQuery();
      query.weekdays = weekdays;

      expect(isValid(validateSync(query))).toBeTruthy();
    });

    it.each([
      [['']],
      [['mon', 'monday-nd']],
      [['Tuesday', 'monday-nd']],
      [['wed', 'wednesday-5th']],
      [['mon', 'monday-2th']],
      [['Friday', 'Friday-1st']],
      [['Saturday', 'saturday-1th']],
      [['sund', 'SUN']],
    ])('should not accept invalid weekdays', (weekdays) => {
      const query = new PickUpQuery();
      query.weekdays = weekdays;

      expect(isValid(validateSync(query))).toBeFalsy();
    });
  });
});
