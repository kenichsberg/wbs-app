import { getEndDatetime } from './getEndDatetime';
import * as consts from '/components/GanttChart/consts';

import { Moment } from 'moment';

const moment = require('moment');


describe('getEndDatetime file', () => {
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
