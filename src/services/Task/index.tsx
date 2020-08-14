import * as constants from '/domain/constants';
import { isHoliday, getDateByDatetime, getTimeByDatetime, getActualWorkingHours, getBreakTime, getHolidayCount } from '/services/Date';
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
    
    return hours;
  }

  const startDateHours = isHoliday(startDate)
    ? 0
    : getActualWorkingHours(startTime, endOfDay);

  const endDateHours = isHoliday(endDate)
    ? 0 
    : getActualWorkingHours(startOfDay, endTime);

  const dayAfterStartDate = startDate.clone().add(1, 'day');

  const dayCount: number = endDate.diff(dayAfterStartDate, 'days');
  const holidayCount: number = getHolidayCount(dayAfterStartDate, endDate);

  const workingDays = dayCount - holidayCount;


  const workingHoursPerDay: number = getActualWorkingHours(startOfDay, endOfDay);

  return (startDateHours + endDateHours) + workingDays * workingHoursPerDay;

};


export const getEndDatetime = (datetime: Moment, remainHours: number): Moment => {

  if (remainHours === 0) return datetime;

  const date = getDateByDatetime(datetime);
  
  if (isHoliday(date)) {
    return getEndDatetime(datetime.clone().add(1, 'day').startOf('day'), remainHours);
  }

  const openTime = moment(constants.OPEN_TIME, 'HH:mm:ss');
  const closeTime = moment(constants.CLOSE_TIME, 'HH:mm:ss');

  const originalTime = getTimeByDatetime(datetime);

  // 時間計算の開始時刻
  const startTime = originalTime.isBefore(openTime)
    ? openTime
    : originalTime;

  const hour = startTime.get('hour');
  const minute = startTime.get('minute');
  const second = startTime.get('second');

  datetime.set('hour', hour)
    .set('minute', minute)
    .set('second', second);

  if (startTime.isSameOrAfter(closeTime)) {
    return getEndDatetime(datetime.clone().add(1, 'day').startOf('day'), remainHours);
  }

  const hoursUntilClose = getActualWorkingHours(startTime, closeTime);

  /*
  const hours = hoursUntilClose < remainHours
    ? hoursUntilClose 
    : remainHours;
   */
  const hours: number = Math.min(remainHours, hoursUntilClose);

  remainHours -= hours;

  const endTime = getEndTime(startTime, hours);

  const breakTime = getBreakTime(startTime, endTime);

  return getEndDatetime(datetime.clone().add(hours + breakTime, 'hour'), remainHours);

};


export const getEndTime = (startTime: Moment, remainHours: number): any => {
  if (remainHours <= 0) {
    return startTime;
  }

  const endTime: Moment = startTime.clone().add(remainHours, 'hour');

  const breakTimes = constants.BREAK_TIMES.filter(breakTime => {
    return startTime.isBefore(moment(breakTime.end, 'HH:mm:ss')) 
      && endTime.isAfter(moment(breakTime.start, 'HH:mm:ss'));
  });

  if (breakTimes.length === 0) {
    return endTime;
  }

  const breakTime: { start: string, end: string } = breakTimes[0];

  const hoursUntilBreakStart: number = moment(breakTime.start, 'HH:mm:ss').diff(startTime, 'hours');

  const hours: number = Math.min(remainHours, hoursUntilBreakStart);

  remainHours -= hours;

  const nextStartTime: Moment = moment(breakTime.end, 'HH:mm:ss');

  return getEndTime(nextStartTime, remainHours);

};
