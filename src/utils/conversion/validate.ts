export const specials = '@#$%&()_+{}';
export const lowercase = 'abcdefghijklmnopqrstuvwxyz';
export const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const numbers = '0123456789';

export const requiredField = (value: string) => {
  return !!value || 'required field';
}

export const isValidEmail = (value: string) => {
  if (!value || value.trim() === '') return true;
  
  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(value) || 'invalid email address';
}

export const isValidMobile = (value: string) => {
  if (!value || value.trim() === '') return true;
  
  return value?.match(/\d/g)?.length===9 || 'invalid mobile number';
}

export const minLengthName = (value: string) => {
  return value?.length >= 5 || 'minimum 5 characters';
}

export const minLength = (value: string) => {
  return value?.length >= 8 || 'minimum 8 characters';
}

export const maxLength = (value: string) => {
  return value?.length <= 50 || 'maximum 50 characters';
}

export const swiftCode = (value: string) => {
  return value?.length <= 15 || 'maximum 15 characters';
}

export const remarksLength = (value: string) => {
  return value?.length <= 250 || 'maximum 250 characters';
}

export const sstLength = (value: string) => {
  const length = value?.length || 0;
  if(length === 0 || length === 17) return true;
  else return 'SST number must be 17 characters';
}

export const brnLength = (value: string) => {
  if (!value || value.trim() === '') return true; // allow empty
  const length = value?.length || 0;
  if(length === 12) return true;
  else return 'BRN number must have 12 digits';
  // if(length >= 5 && length <= 7) return true;
  // else return 'BRN number must be between 5 to 7 characters';
}

export const maxDecimals = (value: string) => {
  if (!value || value?.trim() === '') return true; // allow empty

  const decimalRegex = /^-?\d+(\.\d{1,4})?$/;
  return value.match(decimalRegex) || 'maximum of 4 decimal places';
};


export const maxSixDecimals = (value: string) => {
  if (!value || value?.trim() === '') return true; // allow empty

  // Regex: ^\d+(\.\d{1,6})?$
  // ^\d+ - starts with one or more digits
  // (\.\d{1,6})? - optionally, a decimal point followed by 1 to 6 digits
  // $ - end of string
  const decimalRegex = /^-?\d+(\.\d{1,6})?$/;
  return value.match(decimalRegex) || 'maximum of 6 decimal places';
};

export const brnOldLength = (value: string) => {
  if (!value || value.trim() === '') return true; // allow empty
  const pattern = /^\d{7}-[A-Z]$/;
  return pattern.test(value) || 'Old BRN must be 7 digits, a hyphen, and an uppercase letter (e.g., 1234567-X)';
  // if (!value || value.trim() === '') return true; // allow empty
  // const length = value?.length || 0;
  // if(length >= 5 && length <= 30) return true;
  // else return 'BRN must be between 5 to 30 characters';
}

// export const brnNewFormat = (value: string) => {
//   if (!value || value.trim() === '') return true; // allow empty
//   const pattern = /^\d{7}-[A-Z]$/;
//   return pattern.test(value) || 'Format must be 7 digits, a hyphen, and an uppercase letter (e.g., 1234567-X)';
// }

export const tinLength = (value: string) => {
  if (!value || value.trim() === '') return true; // allow empty
  const length = value?.length || 0;
  if(length >= 11 && length <= 13) return true;
  else return 'TIN number must be 11 or 13 characters';
}

export const stodsLength = (value: string) => {
  if (!value || value.trim() === '') return true; // allow empty

  const isValid = /^\d{8}$/.test(value);
  return isValid || 'SToDS number must be exactly 8 digits (numbers only)';
}

export const checkMe = (value: string) => {
  return !!value || 'Please, accept our terms and conditions';
}

export const withCaps = (value: string) =>{
  return /[A-Z]/.test(value) || 'it must contain at least an uppercase character (A-B)';
}

export const withLow = (value: string) => {
  return /[a-z]/.test(value) || 'it must contain at least a lowercase character (a-z)';
}

export const withSpecial = (value: string) => {
  const pattern = /[!@#$%^&*()_\[\]{};':"\\|,.<>\/?~`]/
  return pattern.test(value) || 'it must contain a special character (!@#%)';
}

export const withNumber = (value: string) => {
  return /[\d]/.test(value) || 'it must contain at least a digit (0-9)';
}

export const noSpace = (value: string) => {
  if (!value || value.trim() === '') return true; // allow empty
  return /^\S*$/.test(value) && value !== '' || 'space is not allowed';
}

export const numbersOnly = (value: string) => {
  if (!value || value.trim() === '') return true; // allow empty
  return /^[0-9]*$/.test(value) || 'only digits from 0 to 9 are allowed';
}

export const postcode = (value: string) => {
  return /^\d{5}$/.test(value) || 'Only 5 digits (0–9) are allowed';
}

export const msicValidation = (value: string) => {
  if (!value || value.trim() === '') return true; // allow empty
	return /^\d{5}$/.test(value) || 'Only 5 digits (0–9) are allowed';
}

export const isEmail = (value: string) => {
  if (!value || value.trim() === '') return true;

  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(value) || 'Invalid email address';
}

export const isNricNew = (value: string) => {
  if (!value || value.trim() === '') return true; // allow empty
	return /^\d{6}-?\d{2}-?\d{4}$/.test(value) || 'Must be 12 digits (e.g., 950721-12-3456)';
}

export const isNricOld = (value: string) => {
  if (!value || value.trim() === '') return true; // allow empty
	return /^[A-Z]\d{7,8}$/.test(value) || 'Invalid legacy NRIC format (e.g., A1234567)';
}

export const isBrnNew = (value: string) => {
  if (!value || value.trim() === '') return true; // allow empty
	return /^\d{12}$/.test(value) || 'Must be a modern 12-digit BRN (e.g., 201901000005)';
}

export const isBrnOld = (value: string) => {
  if (!value || value.trim() === '') return true; // allow empty
	return /^(?:\d{7,8}-[A-Z]|[A-Z]{2}\d{7}-[A-Z])$/.test(value) || 'Invalid legacy BRN format (e.g., 1234567-A)';
}

export const isSST= (value: string) => {
  if (!value || value.trim() === '') return true; // allow empty
	return /^[A-Z]\d{2}-?\d{4}-?\d{8}$/i.test(value) || 'Invalid SST format. (e.g., M10-1808-22200002)';
}

export const isTIN = (value: string) => {
  if (!value || value.trim() === '') return true; // allow empty
	return /^(?:IG|C|CS|D|E|F|FA|PT|TA|TC|TN|TR|TP|J|LE)\d{9,11}$/i.test(value) || 'Invalid Malaysian TIN format (e.g., C20880050010 or IG115002000)';
}

export const isSToDS = (value: string) => {
  if (!value || value.trim() === '') return true; // allow empty
	return /^[A-Z]\d{2}-?\d{4}-?\d{8}$/i.test(value) || 'Invalid format (e.g., W10-1808-30000001)';
}

export const isMSIC = (value: string) => {
  if (!value || value.trim() === '') return true; // allow empty
	return /^\d{5}$/.test(value) || 'MSIC must be a valid 5-digit industrial classification code';
}

export const minAmount = (value: number) => {
  return value >= 1 || 'the minimum amount is 1';
}

export const attachFileRules = (files: File[]) => {
  let messages: any[] = [];
  files.forEach((f: File, i: number) => {
    // return !files || !files.length || f.size < 2000000 || `The size of the file '${f.name}' should be less than 2 MB!`
    if (f.size > 2000000) {
      messages.push(`The size of the file '${f.name}' should be less than 2 MB!`);
    }
  });
  return !files || !files.length || !messages.length || messages[0].toLocaleString()
}

export const getInitials = (type: string): string => {
  if (!type) return '';
  const parts = type.trim().split(/\s+/);
  return (parts.length === 1) 
    ? parts[0].substring(0, 2).toUpperCase() // if only one word, use first two letters
    : (parts[0][0] + parts[1][0]).toUpperCase(); // use first letter of first two words
};

export const preventScientificNotation = (e: KeyboardEvent) => {
  if (['e', 'E', '+', '-'].includes(e.key)) {
    e.preventDefault();
  }
};