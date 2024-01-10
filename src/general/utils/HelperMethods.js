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
    Alert.alert('Network Error', 'Please connect your device to a network');
  }
  if (response.length > 0) {
    return response;
  }
}
