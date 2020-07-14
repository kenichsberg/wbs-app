import { getLeftEndDate, getRightEndDate, getWeekCount } from './dateCounter';
import * as consts from '/components/GanttChart/consts';
import { Moment } from 'moment';

const moment = require('moment');


const dates: Array<Moment> = [
  moment('2020-07-07 21:00:00', 'YYYY-MM-DD hh:mm:ss'),
  moment('2020-07-09 14:00:00', 'YYYY-MM-DD hh:mm:ss'),
  moment('2020-07-20 11:00:00', 'YYYY-MM-DD hh:mm:ss'),
];

const leftSunday = getLeftEndDate(dates);
const rightSaturday = getRightEndDate(dates);

describe('dateCounter', () => {
  describe('getMostLeftDate method', () => {
    it('should calculate left date', () => {
      const expected = moment('2020-7-5 00:00:00', 'YYYY-MM-DD hh:mm:ss');

      expect(leftSunday.format('LL')).toBe(expected.format('LL'));
    });
  });

  describe('getMostRightDate method', () => {
    it('should calculate right date', () => {
      const expected = moment('2020-7-25 23:59:59', 'YYYY-MM-DD hh:mm:ss');

      expect(rightSaturday.format('LL')).toBe(expected.format('LL'));
    });
  });

  describe('getDiffWeeks method', () => {
    it('should calculate weeks', () => {
      const weeks = getWeekCount(leftSunday, rightSaturday);

      expect(weeks).toBe(3);
    });
  });
});
