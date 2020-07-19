import { getTaskWidth, getManDays, getActualWorkingHours, getHolidayCount } from './index';
import * as consts from '/components/GanttChart/consts';

import { Moment } from 'moment';

const moment = require('moment');


//const taskLength = 12;

describe('getTaskWidth file', () => {
  /*
  describe('getTaskWidth method', () => {
    it('should calculate proper task width', () => {
      const taskWidth = getTaskWidth(taskLength);

      expect(taskWidth).toBe(consts.DAY_WIDTH * 1.5);
    });
  });
   */

  /*
  describe('getTermWidth method', () => {
    it('should calculate proper term width', () => {
      const startDate = new Date('2020-07-01 19:00');
      const endDate = new Date('2020-07-03 19:00');
      const termWidth = getTermWidth(startDate, endDate);

      expect(termWidth).toBe(2);
    });
  });
   */

  describe('getManDays method', () => {
    it('other days but less than 24h', () => {
      const startDatetime = moment('2020-07-13 15:00:00', 'YYYY-MM-DD HH:mm:ss');
      const endDatetime = moment('2020-07-14 10:00:00', 'YYYY-MM-DD HH:mm:ss');
      const ManDay = getManDays(startDatetime, endDatetime);

      expect(ManDay).toBe(0.5);
    });

    it('more than 2 days', () => {
      const startDatetime = moment('2020-07-13 15:00:00', 'YYYY-MM-DD HH:mm:ss');
      const endDatetime = moment('2020-07-16 10:00:00', 'YYYY-MM-DD HH:mm:ss');
      const ManDay = getManDays(startDatetime, endDatetime);

      expect(ManDay).toBe(2.5);
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
