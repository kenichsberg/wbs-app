import * as React from 'react';
import * as consts from '/components/GanttChart/consts';
import { isHoliday, getDateByDatetime, getTimeByDatetime, getActualWorkingHours, getBreakTime } from './index';
import { Moment } from 'moment';

const moment = require('moment');


export const getEndDatetime = (datetime: Moment, remainHours: number): Moment => {
  console.log(datetime.format('YYYY-MM-DD HH:mm:ss'), remainHours);

  if (remainHours === 0) return datetime;

  const date = getDateByDatetime(datetime);
  
  if (isHoliday(date)) {
    return getEndDatetime(datetime.clone().add(1, 'day').startOf('day'), remainHours);
  }

  const openTime = moment(consts.OPEN_TIME, 'HH:mm:ss');
  const closeTime = moment(consts.CLOSE_TIME, 'HH:mm:ss');

  const originalTime = getTimeByDatetime(datetime);

  const time = originalTime.isBefore(openTime)
    ? openTime
    : originalTime;

  const hour = time.get('hour');
  const minute = time.get('minute');
  const second = time.get('second');

  datetime.set('hour', hour)
    .set('minute', minute)
    .set('second', second);

  if (time.isSameOrAfter(closeTime)) {
    return getEndDatetime(datetime.clone().add(1, 'day').startOf('day'), remainHours);
  }

  const hoursUntilClose = getActualWorkingHours(time, closeTime);

  const breakTime = getBreakTime(time, closeTime);

  const hours = hoursUntilClose < remainHours
    ? hoursUntilClose 
    : remainHours;

  remainHours -= hours;

  return getEndDatetime(datetime.clone().add(hours + breakTime, 'hour'), remainHours);

};
