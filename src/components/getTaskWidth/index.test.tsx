import { getTaskWidth, getManDayByDates, getActualWorkingHours } from './index';
import * as consts from '/components/GanttChart/consts';

import { Moment } from 'moment';

const moment = require('moment');


const taskLength = 12;

describe('getTaskWidth file', () => {
  describe('getTaskWidth method', () => {
    it('should calculate proper task width', () => {
      const taskWidth = getTaskWidth(taskLength);

      expect(taskWidth).toBe(consts.DAY_WIDTH * 1.5);
    });
  });

  /*
  describe('getTermWidth method', () => {
    it('should calculate proper term width', () => {
      const startDate = new Date('2020-07-01 19:00');
      const endDate = new Date('2020-07-03 19:00');
      const termWidth = getTermWidth(startDate, endDate);

      expect(termWidth).toBe(2);
    });

    it('should calculate proper term width when not even', () => {
      const startDate = new Date('2020-07-01 09:00');
      const endDate = new Date('2020-07-02 13:00');
      const termWidth = getTermWidth(startDate, endDate);

      expect(termWidth).toBe(1.5);
    });

    it('should calculate proper term width when not even 2', () => {
      const startDate = new Date('2020-07-01 09:00');
      const endDate = new Date('2020-07-01 13:00');
      const termWidth = getTermWidth(startDate, endDate);

      expect(termWidth).toBe(0.5);
    });
  });
   */
  describe('getManDayByDates method', () => {
    it('other days but less than 24h', () => {
      const startDatetime = moment('2020/07/13 15:00', 'YYYY/MM/DD hh:mm').toDate();
      const endDatetime = moment('2020/07/14 10:00', 'YYYY/MM/DD hh:mm').toDate();
      const ManDay = getManDayByDates(startDatetime, endDatetime);

      expect(ManDay).toBe(0.5);
    });

    it('more than 2 days', () => {
      const startDatetime = moment('2020/07/13 15:00', 'YYYY/MM/DD hh:mm').toDate();
      const endDatetime = moment('2020/07/16 10:00', 'YYYY/MM/DD hh:mm').toDate();
      const ManDay = getManDayByDates(startDatetime, endDatetime);

      expect(ManDay).toBe(2.5);
    });
  });


  describe('getActualWorkingHours method', () => {
    it('1: end < opening', () => {
      const startHour = 6;
      const endHour = 8;

      const workingHour = getActualWorkingHours(startHour, endHour);
      expect(workingHour).toBe(0);
    });

    it('2: start < opening < end < break < closing', () => {
      const startHour = 6;
      const endHour = 11;

      const workingHour = getActualWorkingHours(startHour, endHour);
      expect(workingHour).toBe(2);
    });

    it('3: start < opening < breakStart < end < breakEnd < closing', () => {
      const startHour = 6;
      const endHour = 12.5;

      const workingHour = getActualWorkingHours(startHour, endHour);
      expect(workingHour).toBe(3);
    });

    it('4: start < opening < break < end < closing', () => {
      const startHour = 6;
      const endHour = 14;

      const workingHour = getActualWorkingHours(startHour, endHour);
      expect(workingHour).toBe(4);
    });

    it('5: start < opening < break < closing < end', () => {
      const startHour = 6;
      const endHour = 14;

      const workingHour = getActualWorkingHours(startHour, endHour);
      expect(workingHour).toBe(4);
    });

    it('6: opening < start < end < break < closing', () => {
      const startHour = 10;
      const endHour = 11;

      const workingHour = getActualWorkingHours(startHour, endHour);
      expect(workingHour).toBe(1);
    });

    it('7: opening < start < breakStart < end < breakEnd < closing', () => {
      const startHour = 10;
      const endHour = 12.5;

      const workingHour = getActualWorkingHours(startHour, endHour);
      expect(workingHour).toBe(2);
    });

    it('8: opening < start < break < end < closing', () => {
      const startHour = 10;
      const endHour = 14;

      const workingHour = getActualWorkingHours(startHour, endHour);
      expect(workingHour).toBe(3);
    });

    it('9: opening < start < break < closing < end', () => {
      const startHour = 10;
      const endHour = 19;

      const workingHour = getActualWorkingHours(startHour, endHour);
      expect(workingHour).toBe(7);
    });

    it('10: opening < breakStart < start < end < breakEnd < closing', () => {
      const startHour = 12.5;
      const endHour = 12.6;

      const workingHour = getActualWorkingHours(startHour, endHour);
      expect(workingHour).toBe(0);
    });

    it('11: opening < breakStart < start < breakEnd < end < closing', () => {
      const startHour = 12.5;
      const endHour = 14;

      const workingHour = getActualWorkingHours(startHour, endHour);
      expect(workingHour).toBe(1);
    });

    it('12: opening < breakStart < start < breakEnd < closing < end', () => {
      const startHour = 12.5;
      const endHour = 19;

      const workingHour = getActualWorkingHours(startHour, endHour);
      expect(workingHour).toBe(5);
    });

    it('13: opening < break < start < end < closing', () => {
      const startHour = 14;
      const endHour = 16;

      const workingHour = getActualWorkingHours(startHour, endHour);
      expect(workingHour).toBe(2);
    });

    it('14: opening < break < start < closing < end', () => {
      const startHour = 14;
      const endHour = 19;

      const workingHour = getActualWorkingHours(startHour, endHour);
      expect(workingHour).toBe(4);
    });

    it('15: opening < break < closing < start < end', () => {
      const startHour = 18;
      const endHour = 19;

      const workingHour = getActualWorkingHours(startHour, endHour);
      expect(workingHour).toBe(0);
    });

    it('16: should return -1 when endHour < startHour', () => {
      const startHour = 19;
      const endHour = 0;

      const workingHour = getActualWorkingHours(startHour, endHour);
      expect(workingHour).toBe(-1);
    });
  });
});
