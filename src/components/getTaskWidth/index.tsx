import * as React from 'react';
import * as consts from '/components/GanttChart/consts';
import { Moment } from 'moment';

const moment = require('moment');


// 期間の長さに応じて、画面上のグラフの長さを計算する
export const getTaskWidth = (diffHour: number): number => {
  const diffDays: number = diffHour / 8;

  return diffDays * consts.DAY_WIDTH;
};


export const getTermWidth = (startDatetime: Date, endDatetime: Date): number => {
  return getManDayByDates(startDatetime, endDatetime) * consts.DAY_WIDTH;
};


// milliSeconds -> days 換算
//const factor = 1 / (1000 * 60 * 60 * 24);

export const getManDayByDates = (startDatetime: Date, endDatetime: Date): number => {

  const startDate: Moment = getDateByDatetime(moment(startDatetime));
  const endDate: Moment = getDateByDatetime(moment(endDatetime));
  const dayCount: number = endDate.diff(startDate, 'days');

  const isSameDay: boolean = moment(startDatetime, 'YYYY/MM/DD').isSame(moment(endDatetime, 'YYYY/MM/DD'));
  
  let diffWorkingHours: number;

  if (isSameDay) {
    diffWorkingHours = getActualWorkingHours(startDatetime.getHours(), endDatetime.getHours());

    //console.log('diffhour:', diffWorkingHours);
  } else {
    const workingHoursStartDay: number = getActualWorkingHours(startDatetime.getHours(), 24);

    const workingHoursEndDay: number = getActualWorkingHours(0, endDatetime.getHours());

    diffWorkingHours = workingHoursStartDay + workingHoursEndDay + (dayCount - 1) * 8;
    //console.log(startDatetime, startDatetime.getHours(), endDatetime, endDatetime.getHours(), 'day:', dayCount, 'hour: ', diffWorkingHours);
  }

  return diffWorkingHours / 8;
};


export const getDateByDatetime = (datetime: Moment) => {
  return moment(datetime.clone().startOf('day').format('LL')).startOf('day');
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

  console.log('hour2', endHour - startHour - breakTime);

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
