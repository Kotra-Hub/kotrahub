import { format } from 'date-fns/format';
import { addMinutes, roundToNearestMinutes, parseISO } from 'date-fns';

export const DATE_TIME_FORMAT = 'd MMM yyyy - h:mm aa';
export const TIME_FORMAT = 'h:mm aa';

export const DATE_FORMAT_SHORT = 'dd/mm/yyyy';
export const TIME_FORMAT_SHORT = 'HH:mm';

export const formatDateTime = (seconds: number, dateTimeFormat = DATE_TIME_FORMAT) => {
  if (!seconds || isNaN(seconds)) return '';

  return format(new Date(seconds * 1000), dateTimeFormat);
};

export const formatTime = (seconds: number, dateTimeFormat = TIME_FORMAT) => {
  return formatDateTime(seconds, dateTimeFormat);
};

export const getDateTimeStrings = (date?: Date) => {
  date = date || new Date();
  const dateString = format(date, DATE_FORMAT_SHORT);
  const timeString = format(date, TIME_FORMAT_SHORT);

  return { date: dateString, time: timeString };
};

export const nextRoundMinutes = (initialDate?: Date, minutes = 15): Date => {
  initialDate = initialDate || new Date();
  initialDate.setSeconds(30);
  const roundTo = minutes;
  initialDate = addMinutes(initialDate, roundTo / 2);
  return roundToNearestMinutes(initialDate);
};

export const intlFormatShortDateTime = (date: Date, options?: Intl.DateTimeFormatOptions): string => {
  options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    ...options
  };
  // return new Intl.DateTimeFormat(undefined, options).format(date)
  return new Intl.DateTimeFormat('ms-MY', options).format(date);
};

export const intlFormatShortDateTimeWithTimeZone = (date: Date, options?: Intl.DateTimeFormatOptions): string => {
  options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    // timeZoneName: 'medium',
    ...options
  };
  return new Intl.DateTimeFormat('ms-MY', options).format(date);
};

export const intlFormatDate = (date: Date, options?: Intl.DateTimeFormatOptions): string => {
  options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    ...options
  };
  return new Intl.DateTimeFormat('ms-MY', options).format(date);
};

export const intlFormatDateInt = (date: Date, options?: Intl.DateTimeFormatOptions): string => {
  options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    ...options
  };
  return new Intl.DateTimeFormat('ms-MY', options).format(date);
};

export const timePlurals = (givenHour: number, givenMin: number): string => {
  let hour = '';
  let minute = '';
  if (givenHour === 1) {
    hour = `${givenHour} hour and `;
  } else if (givenHour > 1) {
    hour = `${givenHour} hours and `;
  }
  if (givenMin === 1) {
    minute = `${givenMin} minute`;
  } else if (givenMin > 1) {
    minute = `${givenMin} minutes`;
  }
  if (hour && !minute) {
    hour = hour.replace(' and ', '');
  }
  return `${hour}${minute}`;
};

export const formatIsoToTime = (date: string) => {
  const formattedDate = parseISO(date);
  return format(formattedDate, TIME_FORMAT);
};

export const formatIsoToDateTime = (date: string) => {
  const formattedDate = parseISO(date);
  return format(formattedDate, DATE_TIME_FORMAT);
};

export const formatDateToShortForm = (date: string) => {
  return format(new Date(date), DATE_FORMAT_SHORT);
};

export const formatTimeToShortForm = (date: string) => {
  return format(new Date(date), TIME_FORMAT_SHORT);
};

export const hoursMinutesFromSeconds = (seconds: number) => {
  let hours = 0;
  let mins = 0;
  if (!isNaN(seconds) && seconds > 0) {
    hours = Math.trunc(seconds / 3600);
    mins = (seconds % 3600) / 60;
  }
  return { hours, mins };
};

export const hoursMinutesToSeconds = (hours: number, mins: number) => {
  let seconds = 0;
  if (!isNaN(hours) && hours > 0) {
    seconds += hours * 3600;
  }
  if (!isNaN(mins) && mins > 0) {
    seconds += mins * 60;
  }
  return seconds;
};
