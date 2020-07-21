import * as React from 'react';
import * as consts from '/components/GanttChart/consts';
import { Moment } from 'moment';

const moment = require('moment');


export const getLeftEndDate = (dates: Array<Moment>): Moment => {
  const minDate = moment.min(dates);
  //const leftEndSunday = minDate.clone().subtract(minDate.day(), 'days');
  const leftEndSunday = minDate.clone().day(0);

  return leftEndSunday.hour(0).minute(0).second(0);
};

export const getRightEndDate = (dates: Array<Moment>): Moment => {
  const maxDate = moment.max(dates);
  //const durationToSaturday = 6 - maxDate.day();
  //const rightEndSaturday = maxDate.clone().add(durationToSaturday, 'days');
  const rightEndSaturday = maxDate.clone().day(6);

  return rightEndSaturday.hour(23).minute(59).second(59);
};

export const getWeekCount = (startDate: Moment, endDate: Moment): number => {
  const diffWeeks: number = endDate.diff(startDate, 'week');

  return diffWeeks + 1;
};
