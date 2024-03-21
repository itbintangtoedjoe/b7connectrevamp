import {Alert} from 'react-native';

const months = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

const shortMonths = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'JuL',
  'Aug',
  'Sep',
  'Okt',
  'Nov',
  'Des',
];

export function GetFormattedDate(dateInput) {
  const date = new Date(dateInput);
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();

  const formattedDate =
    day > 9 ? `${day} ${month} ${year}` : `0${day} ${month} ${year}`;

  return formattedDate;
}

export function GetFormattedDateCAM(dateInput) {
  const date = dateInput.split(' ')[0];
  const processedDate = date.split('-').reverse().join('-');
  const formattedDate = GetFormattedDate(processedDate);
  return formattedDate;
}

export function GetReverseFormattedDate(dateInput) {
  const date = dateInput;
  const [day, month, year] = date.split(' ');
  const monthIndex = months.findIndex(m => m === month);

  const dateObject = new Date(
    Date.UTC(parseInt(year), monthIndex, parseInt(day)),
  );
  const isoDateString = dateObject.toISOString();

  return isoDateString;
}

export function GetFormattedName(nameInput) {
  name = nameInput.trim().toLowerCase();

  return name.replace(/\b\w/g, function (match) {
    return match.toUpperCase();
  });
}

export async function NetworkErrorHandler(err) {
  let response = '';
  if (err.toString() === 'AxiosError: Network Error') {
    response = 'No connection';
    Alert.alert(
      'No connection',
      'Failed to connect to the server. Please check your internet connection',
    );
  } else {
    response = err.toString().split(': ')[1];
  }

  console.log(response);
  if (response.length > 0) {
    return response;
  }
}

export async function SplashNetworkErrorHandler(err) {
  let response = '';
  if (err.toString() === 'AxiosError: Network Error') {
    response = 'No connection';
  } else {
    response = err.toString().split(': ')[1];
  }

  if (response.length > 0) {
    return response;
  }
}

export async function CheckSignInForm(email, password) {
  const emailCheck = await CheckEmail(email);
  const passwordCheck = await CheckPassword(password);
  if (emailCheck || passwordCheck) {
    return 'Form not valid';
  } else {
    return 'Valid';
  }
}

export async function CheckEmail(email) {
  const re = /\S+@\S+\.\S+/;
  if (!email) return "Email can't be empty";
  if (!re.test(email)) return 'Oops! Email address is invalid';
  return '';
}

export async function CheckPassword(password) {
  if (!password) return "Password can't be empty";
  return '';
}

const validatePassword = pw => {
  let val = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/;
  return val.test(pw);
};

export function CheckNewPassword(password) {
  if (!password) return "New password can't be empty";
  //   else if (password.length < 8) return 'Password memiliki minimal 8 karakter.';
  else if (password == 'b7c#default')
    return "New password can't be default password";
  else if (password == 'zuppass.') return 'New password not valid';
  else if (!validatePassword(password))
    return 'Password must contain at least:\n* 8 characters\n* 1 uppercase letter\n* 1 number\n* 1 special character (!, #, $, %, &, ?)';
  return '';
}

export function CheckConfirmPassword(password, confirm) {
  if (!confirm) return "Confirm password can't be empty";
  if (password != confirm) return "Passwords don't match";
  return '';
}
