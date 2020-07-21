import { getManHour, getEndDatetime } from './index';

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
  });
});
