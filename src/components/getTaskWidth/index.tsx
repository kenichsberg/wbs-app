import * as React from 'react';
import * as consts from '/components/GanttChart/consts';


// 期間の長さに応じて、画面上のグラフの長さを計算する
export const getTaskWidth = (diffHour: number): number => {
  const diffDays: number = diffHour / 8;

  return diffDays * consts.DAY_WIDTH;
};

export const getTermWidth = (startDate: Date, endDate: Date): number => {
  return getManDayByDates(startDate, endDate) * consts.DAY_WIDTH;
};

// milliSeconds -> days 換算
const factor = 1 / (1000 * 60 * 60 * 24);

export const getManDayByDates = (startDate: Date, endDate: Date): number => {

  const diffDays: number = (endDate.getTime() - startDate.getTime()) * factor;
  
  let diffWorkingHours: number;

  if (diffDays < 1) {
    diffWorkingHours = getActualWorkingHours(startDate.getHours(), endDate.getHours());

  } else {
    const workingHoursStartDay: number = getActualWorkingHours(startDate.getHours(), 24);

    const workingHoursEndDay: number = getActualWorkingHours(0, endDate.getHours());

    const diffDaysInt: number = parseInt(String(diffDays));

    diffWorkingHours = workingHoursStartDay + workingHoursEndDay + (diffDaysInt - 1) * 8;
  }

  return diffWorkingHours / 8;
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
