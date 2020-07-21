import * as React from 'react';
import * as constants from '/domain/constants';
import { isHoliday, getDateByDatetime, getTimeByDatetime, getActualWorkingHours, getBreakTime, getHolidayCount } from 'services/Date';
import { Moment } from 'moment';

const moment = require('moment');


export const getManHour = (startDatetime: Moment, endDatetime: Moment): number => {

  const startOfDay = moment('00:00:00', 'HH:mm:ss');
  const endOfDay = moment('23:59:59', 'HH:mm:ss');

  const startDate: Moment = getDateByDatetime(startDatetime);
  const endDate: Moment = getDateByDatetime(endDatetime);

  const startTime: Moment = getTimeByDatetime(startDatetime);
  const endTime: Moment = getTimeByDatetime(endDatetime);

  if (startDate.isSame(endDate)) {
    const hours: number = isHoliday(startDate)
      ? 0
      : getActualWorkingHours(startTime, endTime);
    
    //return hours / workingHoursPerDay;
    return hours;
  }

  const startDateHours = isHoliday(startDate)
    ? 0
    : getActualWorkingHours(startTime, endOfDay);

  const endDateHours = isHoliday(endDate)
    ? 0 
    : getActualWorkingHours(startOfDay, endTime);

  const dayAfterStartDate = startDate.clone().add(1, 'day');

  //const workingDays = getWorkingDayCount(dayAfterStartDate, endDate);
  const dayCount: number = endDate.diff(dayAfterStartDate, 'days');
  const holidayCount: number = getHolidayCount(dayAfterStartDate, endDate);

  const workingDays = dayCount - holidayCount;


  const workingHoursPerDay: number = getActualWorkingHours(startOfDay, endOfDay);

  //return (startDateHours + endDateHours) / workingHoursPerDay + workingDays;
  return (startDateHours + endDateHours) + workingDays * workingHoursPerDay;

};


export const getEndDatetime = (datetime: Moment, remainHours: number): Moment => {
  console.log(datetime.format('YYYY-MM-DD HH:mm:ss'), remainHours);

  if (remainHours === 0) return datetime;

  const date = getDateByDatetime(datetime);
  
  if (isHoliday(date)) {
    return getEndDatetime(datetime.clone().add(1, 'day').startOf('day'), remainHours);
  }

  const openTime = moment(constants.OPEN_TIME, 'HH:mm:ss');
  const closeTime = moment(constants.CLOSE_TIME, 'HH:mm:ss');

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
