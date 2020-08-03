import { getManHour, getEndDatetime, getEndTime } from './index';

import { Moment } from 'moment';

const moment = require('moment');


describe('services/Task/', () => {
  describe('getManHour method', () => {
    it('other days but less than 24h', () => {
      const startDatetime = moment('2020-07-13 15:00:00', 'YYYY-MM-DD HH:mm:ss');
      const endDatetime = moment('2020-07-14 10:00:00', 'YYYY-MM-DD HH:mm:ss');
      const manHour = getManHour(startDatetime, endDatetime);

      expect(manHour).toBe(4);
    });

    it('more than 2 days', () => {
      const startDatetime = moment('2020-07-13 15:00:00', 'YYYY-MM-DD HH:mm:ss');
      const endDatetime = moment('2020-07-16 10:00:00', 'YYYY-MM-DD HH:mm:ss');
      const manHour = getManHour(startDatetime, endDatetime);

      expect(manHour).toBe(20);
    });

    it('more than a week', () => {
      const startDatetime = moment('2020-07-01 15:00:00', 'YYYY-MM-DD HH:mm:ss');
      const endDatetime = moment('2020-07-10 10:00:00', 'YYYY-MM-DD HH:mm:ss');
      const manHour = getManHour(startDatetime, endDatetime);

      expect(manHour).toBe(52);
    });
  });


  describe('getEndDatetime()', () => {
    it('without holidays', () => {
      const startDatetime = moment('2020-07-13 15:00:00', 'YYYY-MM-DD HH:mm:ss');
      const manHours = 16

      const endDatetime = getEndDatetime(startDatetime, manHours);
      const expectedDatetime = moment('2020-07-15 15:00:00', 'YYYY-MM-DD HH:mm:ss');

      expect(endDatetime.format('YYYY-MM-DD HH:mm:ss'))
        .toBe(expectedDatetime.format('YYYY-MM-DD HH:mm:ss'));
    });

    it('with holidays', () => {
      const startDatetime = moment('2020-08-02 15:00:00', 'YYYY-MM-DD HH:mm:ss');
      const manHours = 1;

      const endDatetime = getEndDatetime(startDatetime, manHours);
      const expectedDatetime = moment('2020-08-03 10:00:00', 'YYYY-MM-DD HH:mm:ss');

      expect(endDatetime.format('YYYY-MM-DD HH:mm:ss'))
        .toBe(expectedDatetime.format('YYYY-MM-DD HH:mm:ss'));
    });
  });

  describe('getEndTime()', () => {
    it('without break', () => {
      const startTime = moment('10:00', 'HH:mm:ss');
      const manHours = 1;

      const endDatetime = getEndTime(startTime, manHours);
      const expectedDatetime = moment('11:00', 'HH:mm:ss');

      expect(endDatetime.format('HH:mm:ss'))
        .toBe(expectedDatetime.format('HH:mm:ss'));
    });

    it('with break', () => {
      const startTime = moment('10:00', 'HH:mm:ss');
      const manHours = 3;

      const endDatetime = getEndTime(startTime, manHours);
      const expectedDatetime = moment('14:00', 'HH:mm:ss');

      expect(endDatetime.format('HH:mm:ss'))
        .toBe(expectedDatetime.format('HH:mm:ss'));
    });
  });
});
