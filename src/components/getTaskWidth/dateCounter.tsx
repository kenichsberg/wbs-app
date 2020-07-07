import * as React from 'react';
import * as consts from '/components/GanttChart/consts';

const moment = require('moment');

export const getMostLeftDate = (dates: Array<Date>): Date => {
  const leftDate = moment.min(dates);
  const leftSunday = leftDate.subtract(leftDate.day(), 'days');

  return leftSunday.toDate();
};

export const getMostRightDate = (dates: Array<Date>): Date => {
  const rightDate = moment.max(dates);
  const durationToSaturday = 6 - rightDate.day();
  const rightSaturday = rightDate.add(durationToSaturday, 'days');

  return rightSaturday.toDate();
};

export const getWeeksCount = (startDate: Date, endDate: Date): number => {
  const diffWeeks: number = moment(endDate).diff(moment(startDate), 'week');

  return diffWeeks + 1;
};
