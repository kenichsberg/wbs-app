import * as React from 'react';
import * as consts from '/components/GanttChart/consts';

const moment = require('moment');

export const getLeftEndDate = (dates: Array<Date>): Date => {
  const minDate = moment.min(dates);
  const leftEndSunday = minDate.subtract(minDate.day(), 'days');

  return leftEndSunday.toDate();
};

export const getRightEndDate = (dates: Array<Date>): Date => {
  const maxDate = moment.max(dates);
  const durationToSaturday = 6 - maxDate.day();
  const rightEndSaturday = maxDate.add(durationToSaturday, 'days');

  return rightEndSaturday.toDate();
};

export const getWeekCount = (startDate: Date, endDate: Date): number => {
  const diffWeeks: number = moment(endDate).diff(moment(startDate), 'week');

  return diffWeeks + 1;
};
