import * as constants from '/domain/constants';
import { Moment } from 'moment';

const moment = require('moment');


export const parseJsonToMoment = (jsonDateString = '"null"'): Moment => {

  return jsonDateString === '"null"'
    ? moment(new Date())
    : moment(JSON.parse(jsonDateString));

};


export const getDateByDatetime = (datetime: Moment): Moment => {

  return moment(datetime.clone().startOf('day').format('LL'), 'LL')
    .startOf('day');

};


export const getTimeByDatetime = (datetime: Moment): Moment => {

  return moment(datetime.clone().format('HH:mm:ss'), 'HH:mm:ss');

};


export const getDayCount = (startDatetime: Moment, endDatetime: Moment): number => {

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

  const dayCount: number = endDate.diff(dayAfterStartDate, 'days');

  return (startDateHours + endDateHours) / workingHoursPerDay + dayCount;

};


export const getActualWorkingHours = (startTime: Moment, endTime: Moment): number => {

  const openTime: Moment = moment(constants.OPEN_TIME, 'HH:mm:ss');
  const closeTime: Moment = moment(constants.CLOSE_TIME, 'HH:mm:ss');

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

  const breakTimes = constants.BREAK_TIMES.filter(breakTime => {
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


/*
export const getWorkingDayCount = (startDate: Moment, endDate: Moment): number => { 

  const dayCount: number = endDate.diff(startDate, 'days');
  
  const holidayCount: number = getHolidayCount(startDate, endDate);

  return dayCount - holidayCount;

};
 */


export const isHoliday = (date: Moment): boolean => {
  const holidayCount = getHolidayCount(date, date);

  return holidayCount > 0;
};


export const getHolidayCount = (startDate: Moment, endDate: Moment): number => {

  const date: Moment = startDate.clone();
  const dates: Array<Moment> = [];

  dates.push(date.clone());

  while (!date.isSame(endDate)) {
    date.add(1, 'day');
    dates.push(date.clone());
  } 

  const holidayCount: number = dates
    .filter(date => date.day() === 0 || date.day() === 6)
    .length;

  const publicHolidayCount: number = constants.PUBLIC_HOLIDAYS
    .filter(publicHoliday => publicHoliday.isBetween(startDate, endDate))
    .length;

  const additionalHolidayCount: number = constants.ADDITIONAL_HOLIDAYS
    .filter(additionalHoliday => additionalHoliday.isBetween(startDate, endDate))
    .length;

  const additionalWorkingDayCount: number = constants.ADDITIONAL_WORKING_DAYS
    .filter(additionalWorkingDay => additionalWorkingDay.isBetween(startDate, endDate))
    .length;


  return holidayCount + publicHolidayCount + additionalHolidayCount - additionalWorkingDayCount;

};
