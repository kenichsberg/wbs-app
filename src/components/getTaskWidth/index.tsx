import * as React from 'react';
import * as consts from '/components/GanttChart/consts';
import { Moment } from 'moment';

const moment = require('moment');


// 期間の長さに応じて、画面上のグラフの長さを計算する
export const getTaskWidth = (diffHour: number): number => {
  const diffDays: number = diffHour / 8;

  return diffDays * consts.DAY_WIDTH;
};


export const getTermWidth = (startDatetime: Moment, endDatetime: Moment): number | false => {

  if (startDatetime.isAfter(endDatetime)) return false;

  return getManDayByDates(startDatetime, endDatetime) * consts.DAY_WIDTH;
};


export const getHolidayCount = (startDatetime: Moment, endDatetime: Moment): number => {

  const startDate = getDateByDatetime(startDatetime);
  const endDate = getDateByDatetime(endDatetime);

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

// milliSeconds -> days 換算
//const factor = 1 / (1000 * 60 * 60 * 24);

export const getManDayByDates = (startDatetime: Moment, endDatetime: Moment): number => {

  const startDate: Moment = getDateByDatetime(startDatetime);
  const endDate: Moment = getDateByDatetime(endDatetime);
  const dayCount: number = endDate.diff(startDate, 'days');

  //const isSameDay: boolean = moment(startDatetime, 'YYYY/MM/DD').isSame(moment(endDatetime, 'YYYY/MM/DD'));
  const isSameDay: boolean = startDate.isSame(endDate);
  
  let diffWorkingHours: number;

  if (isSameDay) {
    diffWorkingHours = getActualWorkingHours(startDatetime.hour(), endDatetime.hour());

    //console.log('diffhour:', diffWorkingHours);
  } else {
    const workingHoursStartDay: number = getActualWorkingHours(startDatetime.hour(), 24);

    const workingHoursEndDay: number = getActualWorkingHours(0, endDatetime.hour());

    diffWorkingHours = workingHoursStartDay + workingHoursEndDay + (dayCount - 1) * 8;
    //console.log(startDatetime, startDatetime.hour(), endDatetime, endDatetime.hour(), 'day:', dayCount, 'hour: ', diffWorkingHours);
  }

  return diffWorkingHours / 8;
};


export const getDateByDatetime = (datetime: Moment) => {
  return moment(datetime.clone().startOf('day').format('LL'), 'LL').startOf('day');
};


export const getActualWorkingHours = (startHour: number, endHour: number): number => {
  if (endHour < startHour) return -1;

  if (consts.CLOSE_HOUR < startHour 
    || endHour < consts.OPEN_HOUR) 
  {
    return 0;
  }

  if (startHour < consts.OPEN_HOUR) {
    startHour = consts.OPEN_HOUR;
  }

  if (consts.CLOSE_HOUR < endHour) {
    endHour = consts.CLOSE_HOUR;
  } 

  const breakTime = getBreakTime(startHour, endHour);

  //console.log('hour2', endHour - startHour - breakTime);

  return endHour - startHour - breakTime;
}


export const getBreakTime = (startHour: number, endHour: number): number =>  {

  const breakTimes = consts.BREAK_TIMES.filter(breakTime => {

    return !(endHour < breakTime.start || breakTime.end < startHour)
  })

  if (breakTimes.length === 0) return 0;

  return breakTimes.reduce(
    (accumlator, currentValue) => {
      if (startHour < currentValue.start) {
        startHour = currentValue.start;
      }

      if (currentValue.end < endHour) {
        endHour = currentValue.end;
      }

      return accumlator + (endHour - startHour);

    }, 0
  );
}
