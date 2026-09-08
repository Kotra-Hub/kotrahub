// import moment from 'moment';
import { intlFormatDate, intlFormatShortDateTime, intlFormatShortDateTimeWithTimeZone } from './datetime';
import { CommonStatus } from '@/interfaces/common.interface';
import { format } from 'date-fns';

const getBrowserTimeZone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export const convertToKB = (value: number) => {
  return Math.round(value / 1000);
};

export const emptyText = (value: string | number | string[]) => {
  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(', ') : '-';
  }
  return value || '-';
};

export const truncateText = (text: string, length = 25, suffix = '...') => {
  if (!text) return '';

  return text.length < length ? text : text.substring(0, length) + suffix;
};

export const formatDateTimeWithTimeZone = (dateString: string, timeZone?: string) => {
  if (!dateString) return '';
  if (!timeZone) {
    timeZone = getBrowserTimeZone();
  }

  return intlFormatShortDateTimeWithTimeZone(new Date(dateString), { timeZone });
};

export const formatShortDateTime = (dateString: string, timeZone?: string) => {
  if (!timeZone) {
    timeZone = getBrowserTimeZone();
  }

  return dateString ? intlFormatShortDateTime(new Date(dateString), { timeZone }) : '';
};

export const formatTimeSince = (dateString: string) => {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;

  // if date from yesterday
  interval = seconds / 86400;
  if (interval < 2) {
    // if (interval > 1) {
    //   return Math.floor(interval) + " years";
    // }
    // interval = seconds / 2592000;
    // if (interval > 1) {
    //   return Math.floor(interval) + " months";
    // }
    interval = seconds / 86400;
    if (interval > 1 && interval < 2) {
      // original shows e.g. "yesterday at 11:7"):
      // return `yesterday at ${date.getHours()}:${date.getMinutes()}`;
      // return `yesterday at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

      // fix with correct time format:
      return `yesterday at ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    }
    interval = seconds / 3600;
    if (interval > 1) {
      const hr = Math.floor(interval);
      return hr + ` hour${hr == 1 ? '' : 's'} ago`;
    }
    interval = seconds / 60;
    if (interval > 1) {
      const min = Math.floor(interval);
      return min + ` minute${min == 1 ? '' : 's'} ago`;
    }
    // const sec = Math.floor(interval);
    return `now`;
  }

  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}
    ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`; // :${date.getSeconds().toString().padStart(2, '0')}

  // if (date.getFullYear() === new Date().getFullYear()) {
  //   // return `${date.getDate()}/${date.getMonth()} às ${date.getHours()}:${date.getMinutes()}`;
  // }
  // return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} às ${date.getHours()}:${date.getMinutes()}`;

  // if (!timeZone) { timeZone = getBrowserTimeZone() };
  // return dateString ? intlFormatShortDateTime(new Date(dateString), { timeZone }) : '';
};

export const formatDate = (date: string | number | Date) => intlFormatDate(new Date(date));

export const formatFullDate = (date: string | Date | undefined) => {
  if (!date) return '';
  return format(new Date(date), 'dd MMM yyyy, HH:mm:ss');
};

// export const formatDOB = (date: string) => (date ? moment(date).format('DD/MM/YYYY') : '');

export const formatNumber = (value: number | string) => {
  return new Intl.NumberFormat().format(Number(value));
};

// return date in the following format: yyyy-MM-dd
export const toDateStrYYYYMMDD = (inDate?: Date) => {
  if (!inDate) return '';
  const date = new Date(inDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

// return date in the following format: yyyy-MM-dd
export const toDateStr = (inDate?: Date) => {
  if (!inDate) return '';
  const date = new Date(inDate);
  // Adjust for timezone offset to prevent the date from shifting
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() + userTimezoneOffset).toISOString().slice(0, 10);
}

// export const toCurrency = (value: number) => {
//   if (typeof value !== 'number') return value;

//   const formatter = new Intl.NumberFormat('ms-MY', { minimumFractionDigits: 2 });

//   return formatter.format(value);
// };

export const toCurrency = (value: number, currencyId?: string, maxDigit?: number) => {
  if (typeof value !== 'number') return value;

  const formatter = new Intl.NumberFormat('ms-MY', {
    style: 'currency',
    currency: currencyId || 'MYR',
    minimumFractionDigits: 2,
    maximumFractionDigits: maxDigit || 4,
  });
  return formatter.format(value);
};

export const toRinggit = (value: number) => {
  if (typeof value !== 'number') return value;

  const formatter = new Intl.NumberFormat('ms-MY', {
    style: 'currency',
    currency: 'RM',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(value);
};

export const toFixed = (value: number, digit = 2) => {
  if (isNaN(value)) return '';

  return value.toFixed(digit);
};

export const formatIcNumber = (ic: string | undefined) => (ic || '').toUpperCase();

/**
 * Capitalizes the first letter of every word in the string.
 */
export const capitalizeText = (val: string): string => {
  return val ? val.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()) : '';
};

/**
 * Generates utility classes for tooltips to ensure background color and automatic text contrast.
 */
export const getTooltipClass = (color: string): string => {
  // warning and info usually need black text for readability in light/dark modes
  const isLightBackground = ['warning', 'info', 'lightwarning', 'lightprimary'].includes(color);
  return `bg-${color} ${isLightBackground ? 'text-black' : 'text-white'} text-capitalize font-weight-medium px-3 py-1 shadow-md`;
};

export const getNameInitials = (fullName: string): string => {
  const fnArr = fullName?.split(' ');
  return fnArr?.length > 0 ? fnArr[0].charAt(0) + fnArr[fnArr.length - 1].charAt(0) : 'KP';
};

/**
 * Converts a number to a lower-case roman numeral (for i, ii, iii, etc.)
 */
export const toRoman = (num: number): string => {
  const lookup: Record<string, number> = { m: 1000, cm: 900, d: 500, cd: 400, c: 100, xc: 90, l: 50, xl: 40, x: 10, ix: 9, v: 5, iv: 4, i: 1 };
  let roman = '';
  for (const i in lookup) {
    while (num >= lookup[i]) { roman += i; num -= lookup[i]; }
  }
  return roman;
};

export const statusIcon = (status?: string) => {
  if (status === CommonStatus.INACTIVE
    || status === CommonStatus.OBSOLETE
    || status === CommonStatus.CLOSURE
    || status === CommonStatus.RESIGNED
    || status === CommonStatus.TERMINATED
    || status === CommonStatus.DECEASED
  ) {
    return 'mdi-file-remove';
  }
  else if (status === CommonStatus.REJECTED || status === CommonStatus.REJECTED_AUTO) {
    return 'mdi-file-lock';
  }
  else if (status === CommonStatus.APPROVED
    || status === CommonStatus.EXECUTION
    || status === CommonStatus.ACTIVE
  ) {
    return 'mdi-file-check';
  }
  else if (status === CommonStatus.IN_REVIEW
    || status === CommonStatus.MONITORING
    || status === CommonStatus.ABSCONDED
    || status === CommonStatus.MISSING_INFO
  ) {
    return 'mdi-file-alert';
  }
  else if (status === CommonStatus.SUBMITTED) {
    return 'mdi-file-send';
  }
  else if (status === CommonStatus.ARCHIVED) {
    return 'mdi-archive-arrow-up';
  }
  else {
    return 'mdi-information';
  }
}

// TODO: review the colors and refactor code
export const phaseColor = (phase?: string) => {
  if (phase === 'planning'
    || phase === 'decommissioning'
  ) {
    return 'darktertiary';
  }
  if (phase === 'purchase'
    || phase === 'commissioning'
    || phase === 'operation'
  ) {
    return 'primary';
  }
  else if (phase === 'installation'
    || phase === 'qualification'
    || phase === 'calibration'
    || phase === 'maintenance'
  ) {
    return 'warning';
  }
  else {
    return 'info';
  }
}

export const toResult = (bool?: Boolean) => {
  if (bool?.valueOf() == false) {
    return 'success';
  }
  else {
    return 'error';
  }
}

export const reqColor = (status?: string, phase?: string) => {
  status = status?.toLowerCase();
  phase = phase?.toLowerCase();

  if ((status?.startsWith("pending") && phase?.startsWith("authorization"))
    || (status?.startsWith("pending") && phase?.startsWith("processing"))) {
    return 'secondary'
  }

  if ((status?.startsWith("on hold")) && phase?.startsWith("processing")) {
    return 'darktertiary'
  }

  if ((status?.startsWith("forwarded") && phase?.startsWith("processing"))) {
    return 'accent'
  }

  if ((status?.startsWith("in progress") && phase?.startsWith("processing"))) {
    return 'warning'
  }

  if (((status?.startsWith("completed")) && phase?.startsWith("closure")) || ((status?.startsWith("pending")) && phase?.startsWith("closure"))
    || ((status?.startsWith("closed")) && phase?.startsWith("closure"))) {
    return 'success'
  }

  if (status?.startsWith("aborted")) {
    return 'error'
  }

  else {
    return 'info';
  }

}

export const toColor = (str?: string) => {
  str = str?.toLowerCase();
  if (str?.startsWith("under")
    || str?.startsWith("in")
    || str?.startsWith("awaiting")
    || str?.startsWith("waiting")
    || str?.startsWith("pending")
    || str?.startsWith("missing")
    || str?.startsWith("request")
    || str?.startsWith("high")
    || str?.startsWith("processing")
    || str?.startsWith("verif")
  ) {
    return 'warning';
  }
  else if (str == 'approved'
    || str == "approve"
    || str?.startsWith("active")
    || str?.startsWith("available")
    || str?.startsWith("publish")
    || str?.startsWith("receive")
    || str?.startsWith("sent")
    || str?.startsWith("excellent")
    || str?.startsWith("ready")
    || str?.startsWith("complete")
    // || str?.startsWith("send")
    // || str?.startsWith("active")
    // || str?.startsWith('assign') // moved to secondary
  ) {
    return 'success';
  }
  else if (str?.startsWith('reject')
    || str?.startsWith('auto reject')
    || str?.startsWith('unassign')
    || str?.startsWith('delete')
    || str?.startsWith("remove")
    || str?.startsWith("emergency")
    || str?.startsWith("bad")
    || str?.startsWith("expired")
    || str?.startsWith("review rejected")
  ) {
    return 'error';
  }
  else if (str?.startsWith('archive')
    || str?.startsWith('deactivate')
    || str?.startsWith('disable')
    || str?.startsWith('terminate')
    || str?.startsWith('decease')
    || str?.startsWith('close')
    || str?.startsWith('resign')
    || str?.startsWith('obsolete')
    || str?.startsWith('inactive')
    || str?.startsWith('cancel')
    || str?.startsWith('decommission')
    || str?.startsWith("low")
    || str?.startsWith("withdraw")
    || str?.startsWith("out")
    || str?.startsWith("on")
  ) {
    return 'darktertiary';
  }
  // else if (str == 'add'
  //   || str == "reset"
  //   || str == "change"
  //   || str == "update"
  //   || str == "ok"
  //   || str == 'approve level 2' // not needed anymore
  //   || str == 'approved level 2' // not needed anymore
  // ) {
  //   return 'secondary';
  // }
  else if (str == 'clone'
    || str == 'submit'
    || str == 'send'
    || str == 'remove'
    || str == 'add'
    || str == 'change'
    || str == 'update'
    || str == 'reset'
    || str == 'ok'
    || str == 'assign'
  ) {
    return 'secondary';
  }
  else if (str == 'approve level 1'
    || str == 'approved level 1'
  ) {
    return 'accent';
  }
  else if (str == 'draft'
    // || str == 'created'
    // || str == 'added'
  ) {
    return 'draft';
  }
  else {
    return 'info';
  }
}

export const statusColor = (status?: string) => {
  if (status === CommonStatus.INACTIVE || status === CommonStatus.OBSOLETE || status === CommonStatus.CLOSURE || status === CommonStatus.RESIGNED
    || status === CommonStatus.TERMINATED || status === CommonStatus.DECEASED) {
    return 'darktertiary';
  } else if (status === CommonStatus.REJECTED || status === CommonStatus.REJECTED_AUTO || status === CommonStatus.REQUISITION_REJECTED || status === CommonStatus.RETURN_REJECTED) {
    return 'error';
  } else if (status === CommonStatus.APPROVED || status === CommonStatus.EXECUTION || status === CommonStatus.ACTIVE || status === CommonStatus.AVAILABLE
    || status === CommonStatus.COMPLETED) {
    return 'success';
  } else if (status === CommonStatus.MONITORING || status === CommonStatus.ABSCONDED || status === CommonStatus.MISSING_INFO || status === CommonStatus.IN_PROGRESS || status === CommonStatus.REQUEST_INFO) {
    return 'warning';
  } else if (status === CommonStatus.SUBMITTED || status === CommonStatus.RETURN_APPROVE || status === CommonStatus.IN_REVIEW) {
    return 'accent';
  } else {
    return 'info';
  }
}

export const toIcon = (str?: string) => {
  str = str?.toLowerCase();
  if (str?.startsWith("create")
    || str?.startsWith("add")
  ) {
    return 'mdi-pencil';
  }
  else if (str?.startsWith("submit")
    || str?.startsWith("send")
  ) {
    return 'mdi-send';
  }
  else if (str?.startsWith("in review")
    || str?.startsWith("under verification")
    || str?.startsWith("under sector review")
    || str?.startsWith("under department review")
    || str?.startsWith("under management review")
  ) {
    return 'mdi-eye';
  }
  else if (str?.startsWith("approve")
    || str?.startsWith("execution")
    || str?.startsWith("active")
  ) {
    return 'mdi-check';
  }
  else if (str?.startsWith('reject')
    || str?.startsWith('auto reject')
    || str?.startsWith('unassign')
    || str?.startsWith('delete')
    || str?.startsWith("remove")
    || str?.startsWith("resign")
    || str?.startsWith('deactivate')
    || str?.startsWith('disable')
    || str?.startsWith('terminate')
    || str?.startsWith('decease')
    || str?.startsWith('close')
    || str?.startsWith('closure')
    || str?.startsWith('resign')
    || str?.startsWith('obsolete')
    || str?.startsWith('inactive')
  ) {
    return 'mdi-close';
  }
  else if (str?.startsWith('missing info')
    || str?.startsWith('monitoring')
    || str?.startsWith('absconded')
  ) {
    return 'mdi-alert';
  }
  else if (str?.startsWith('archive')) {
    return 'mdi-archive-arrow-up';
  }
  else {
    return 'mdi-information';
  }

  // switch(str?.toUpperCase()) {
  //   case CommonStatus.CREATED:
  //     return 'mdi-file-edit';
  //   case CommonStatus.SUBMITTED:
  //     return 'mdi-file-send';
  //   case CommonStatus.APPROVED:
  //       return 'mdi-file-check';
  //   case CommonStatus.EXECUTION:
  //     return 'mdi-file-check';
  //   case CommonStatus.ACTIVE:
  //     return 'mdi-file-check';
  //   case CommonStatus.IN_REVIEW:
  //     return 'mdi-file-eye';
  //   case CommonStatus.MISSING_INFO:
  //     return 'mdi-file-alert';
  //   case CommonStatus.MONITORING:
  //     return 'mdi-file-alert';
  //   case CommonStatus.ABSCONDED:
  //     return 'mdi-file-alert';
  //   case CommonStatus.REJECTED:
  //     return 'mdi-file-remove'; // 'mdi-file-lock'
  //   case CommonStatus.INACTIVE:
  //     return 'mdi-file-remove';
  //   case CommonStatus.OBSOLETE:
  //     return 'mdi-file-remove';
  //   case CommonStatus.CLOSURE:
  //     return 'mdi-file-remove';
  //   case CommonStatus.RESIGNED:
  //     return 'mdi-file-remove';
  //   case CommonStatus.TERMINATED:
  //     return 'mdi-file-remove';
  //   case CommonStatus.DECEASED:
  //     return 'mdi-file-remove';
  //   case CommonStatus.ARCHIVED:
  //     return 'mdi-archive-arrow-up';
  //   default:
  //     return 'mdi-information';
  // }
}

// export const statusColor = (status?: string) => {
//   if (status === CommonStatus.INACTIVE
//     || status === CommonStatus.OBSOLETE
//     || status === CommonStatus.CLOSURE
//     || status === CommonStatus.RESIGNED
//     || status === CommonStatus.TERMINATED
//     || status === CommonStatus.DECEASED
//   ) {
//       return 'darktertiary';
//   } else if (status === CommonStatus.REJECTED) {
//     return 'error';
//   } else if (status === CommonStatus.APPROVED
//     || status === CommonStatus.EXECUTION
//     || status === CommonStatus.ACTIVE
//   ) {
//     return 'success';
//   } else if (status === CommonStatus.UNDER_VERIFICATION
//     ||status === CommonStatus.IN_REVIEW
//     || status === CommonStatus.MONITORING
//     || status === CommonStatus.ABSCONDED
//     || status === CommonStatus.MISSING_INFO
//     || status === CommonStatus.AWAITING_APPROVAL
// ) {
//     return 'warning';
//   } else if (status === CommonStatus.SUBMITTED) {
//     return 'primary';
//   } else {
//     return 'info';
//   }
// }

// export const toColor = (status?: string) => {
//   switch(status?.toUpperCase()) {
//     case CommonStatus.APPROVED:
//       return 'success';
//     case CommonStatus.SUBMITTED:
//       return 'primary';
//     case CommonStatus.EXECUTION:
//       return 'success';
//     case CommonStatus.ACTIVE:
//       return 'success';
//     case CommonStatus.MISSING_INFO:
//       return 'warning';
//     case CommonStatus.IN_REVIEW:
//       return 'warning';
//     case CommonStatus.MONITORING:
//       return 'warning';
//     case CommonStatus.ABSCONDED:
//       return 'warning';
//     case CommonStatus.REJECTED:
//       return 'error';
//     case CommonStatus.INACTIVE:
//       return 'darktertiary';
//     case CommonStatus.OBSOLETE:
//       return 'darktertiary';
//     case CommonStatus.CLOSURE:
//       return 'darktertiary';
//     case CommonStatus.RESIGNED:
//       return 'darktertiary';
//     case CommonStatus.TERMINATED:
//       return 'darktertiary';
//     case CommonStatus.DECEASED:
//       return 'darktertiary';
//     default:
//       return 'info';
//   }
// }
