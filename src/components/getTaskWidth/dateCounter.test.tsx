import { getMostLeftDate, getMostRightDate, getWeeksCount } from './dateCounter';
import * as consts from '/components/GanttChart/consts';

const moment = require('moment');

const dates: Array<Date> = [
  moment('2020/7/7'),
  moment('2020/7/9'),
  moment('2020/7/20')
];

const leftSunday = getMostLeftDate(dates);
const rightSaturday = getMostRightDate(dates);

describe('dateCounter', () => {
  describe('getMostLeftDate method', () => {
    it('should calculate left date', () => {

      expect(leftSunday).toEqual(moment('2020/7/5').toDate());
    });
  });

  describe('getMostRightDate method', () => {
    it('should calculate right date', () => {

      expect(rightSaturday).toEqual(moment('2020/7/25').toDate());
    });
  });

  describe('getDiffWeeks method', () => {
    it('should calculate weeks', () => {
      const weeks = getWeeksCount(leftSunday, rightSaturday);

      expect(weeks).toBe(3);
    });
  });
});
