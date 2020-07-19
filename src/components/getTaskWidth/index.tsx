import * as React from 'react';
import * as consts from '/components/GanttChart/consts';
import { Moment } from 'moment';

const moment = require('moment');


// 期間の長さに応じて、画面上のグラフの長さを計算する
export const getTaskWidth = (diffHour: number): number => {
  const diffDays: number = diffHour / 8;

  return diffDays * consts.DAY_WIDTH;
};


export const getTermWidth = (startDatetime: Moment, endDatetime: Moment): number => {

  return getManDays(startDatetime, endDatetime) * consts.DAY_WIDTH;
};


export const getManDays = (startDatetime: Moment, endDatetime: Moment): number => {

  const startOfDay = moment('00:00:00', 'HH:mm:ss');
  const endOfDay = moment('23:59:59', 'HH:mm:ss');

  const workingHoursPerDay: number = getActualWorkingHours(startOfDay, endOfDay);

  const startDate: Moment = getDateByDatetime(startDatetime);
  const endDate: Moment = getDateByDatetime(endDatetime);

  const startTime: Moment = getTimeByDatetime(startDatetime);
  const endTime: Moment = getTimeByDatetime(endDatetime);

  if (startDate.isSame(endDate)) {
    const hours: number = getActualWorkingHours(startTime, endTime);
    
    return hours / workingHoursPerDay;
  }

  const startDateHours = getActualWorkingHours(startTime, endOfDay);
  const endDateHours = getActualWorkingHours(startOfDay, endTime);

  const dayAfterStartDate = startDate.clone().add(1, 'day');

  const workingDays = getWorkingDayCount(dayAfterStartDate, endDate);

  return (startDateHours + endDateHours) / workingHoursPerDay + workingDays;

};


export const getDateByDatetime = (datetime: Moment) => {

  return moment(datetime.clone().startOf('day').format('LL'), 'LL').startOf('day');

};


export const getTimeByDatetime = (datetime: Moment) => {

  return moment(datetime.clone().format('HH:mm:ss'), 'HH:mm:ss');

};


export const getActualWorkingHours = (startTime: Moment, endTime: Moment): number => {

  const openTime: Moment = moment(consts.OPEN_TIME, 'HH:mm:ss');
  const closeTime: Moment = moment(consts.CLOSE_TIME, 'HH:mm:ss');

  if (startTime.isAfter(closeTime)
    || endTime.isBefore(openTime)) 
  {
    return 0;
  }

  if (startTime.isBefore(openTime)) {
    startTime = openTime;
  }

  if (endTime.isAfter(closeTime)) {
    endTime = closeTime;
  }

  const breakTime = getBreakTime(startTime, endTime);

  return endTime.diff(startTime, 'hours') - breakTime;

};


export const getBreakTime = (startTime: Moment, endTime: Moment): number =>  {

  const breakTimes = consts.BREAK_TIMES.filter(breakTime => {
    return startTime.isBefore(moment(breakTime.end, 'HH:mm:ss')) 
      && endTime.isAfter(moment(breakTime.start, 'HH:mm:ss'));
  });

  if (breakTimes.length === 0) return 0;

  return breakTimes.reduce(
    (accumlator, currentValue) => {
      const breakStart = moment(currentValue.start, 'HH:mm:ss');
      const breakEnd = moment(currentValue.end, 'HH:mm:ss');

      if (startTime.isBefore(breakStart)) {
        startTime = breakStart;
      }

      if (endTime.isAfter(breakEnd)) {
        endTime = breakEnd;
      }

      return accumlator + endTime.diff(startTime, 'hours');

    }, 0
  );
};


export const getWorkingDayCount = (startDate: Moment, endDate: Moment): number => { 

  const dayCount: number = endDate.diff(startDate, 'days');
  
  const holidayCount: number = getHolidayCount(startDate, endDate);

  return dayCount - holidayCount;

};


export const getHolidayCount = (startDate: Moment, endDate: Moment): number => {

  let date: Moment = startDate.clone();
  let dates: Array<Moment> = [];

  dates.push(date.clone());

  while (!date.isSame(endDate)) {
    date.add(1, 'day');
    dates.push(date.clone());
  } 

  const holidayCount: number = dates
    .filter(date => date.day() === 0 || date.day() === 6)
    .length;

  const publicHolidayCount: number = consts.PUBLIC_HOLIDAYS
    .filter(publicHoliday => publicHoliday.isBetween(startDate, endDate))
    .length;

  const additionalHolidayCount: number = consts.ADDITIONAL_HOLIDAYS
    .filter(additionalHoliday => additionalHoliday.isBetween(startDate, endDate))
    .length;

  const additionalWorkingDayCount: number = consts.ADDITIONAL_WORKING_DAYS
    .filter(additionalWorkingDay => additionalWorkingDay.isBetween(startDate, endDate))
    .length;


  return holidayCount + publicHolidayCount + additionalHolidayCount - additionalWorkingDayCount;

};
