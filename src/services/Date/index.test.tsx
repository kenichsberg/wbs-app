import { getDateByDatetime,  getActualWorkingHours, getHolidayCount, getDayCount } from './index';

import { Moment } from 'moment';

const moment = require('moment');


//const taskLength = 12;

describe('getTaskWidth file', () => {
  describe('getDateByDatetime method', () => {
    it('makes moment obj without time', () => {
      const datetime = moment('2020-07-13 15:00:00', 'YYYY-MM-DD HH:mm:ss');
      const date = getDateByDatetime(datetime);
      const expected = moment('2020-07-13 15:00:00');

      expect(date.format('LL')).toBe(expected.format('LL'));
    });
  });


  describe('getDayCount method', () => {
    it('more than a week', () => {
      const startDatetime = moment('2020-07-01 15:00:00', 'YYYY-MM-DD HH:mm:ss');
      const endDatetime = moment('2020-07-10 10:00:00', 'YYYY-MM-DD HH:mm:ss');
      const dayCount = getDayCount(startDatetime, endDatetime);

      expect(dayCount).toBe(8.5);
    });

    it('less than a week', () => {
      const startDatetime = moment('2020-06-28 00:00:00', 'YYYY-MM-DD HH:mm:ss');
      const endDatetime = moment('2020-07-01 15:00:00', 'YYYY-MM-DD HH:mm:ss');
      const dayCount = getDayCount(startDatetime, endDatetime);

      expect(dayCount).toBe(3.625);
    });
  });


  describe('getActualWorkingHours method', () => {
    it('start < opening < break < closing < end', () => {
      const startTime: Moment = moment('06:00:00', 'HH:mm:ss');
      const endTime: Moment = moment('14:00:00', 'HH:mm:ss');

      const workingHour: number = getActualWorkingHours(startTime, endTime);
      expect(workingHour).toBe(4);
    });

    it('opening < start < end < break < closing', () => {
      const startTime: Moment = moment('10:00:00', 'HH:mm:ss');
      const endTime: Moment = moment('11:00:00', 'HH:mm:ss');

      const workingHour: number = getActualWorkingHours(startTime, endTime);
      expect(workingHour).toBe(1);
    });

    it('opening < start < breakStart < end < breakEnd < closing', () => {
      const startTime: Moment = moment('10:00:00', 'HH:mm:ss');
      const endTime: Moment = moment('12:30:00', 'HH:mm:ss');

      const workingHour: number = getActualWorkingHours(startTime, endTime);
      expect(workingHour).toBe(2);
    });
  });


  describe('getHolidayCount method', () => {
    it('a week from Sunday to Saturday', () => {
      const startDate = moment('2020-07-09', 'YYYY-MM-DD');
      const endDate = moment('2020-07-15', 'YYYY-MM-DD');
      const holidayCount = getHolidayCount(startDate, endDate);

      expect(holidayCount).toBe(2);
    });
  });
});
