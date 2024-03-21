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

export function GetFormattedDateEO(dateInput) {
  const date = new Date(dateInput);
  const year = date.getFullYear();
  const shortYear = String(year).slice(-2);
  const month = shortMonths[date.getMonth()];
  const day = date.getDate();

  const formattedDate =
    day > 9 ? `${day} ${month} ${shortYear}` : `0${day} ${month} ${shortYear}`;

  return formattedDate;
}

export function GetFormattedHourEO(dateInput) {
  const hour =
    dateInput.split('T')[1].split(':')[0] +
    ':' +
    dateInput.split('T')[1].split(':')[1];

  return hour;
}
