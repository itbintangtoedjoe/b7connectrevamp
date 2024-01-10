import axios from 'axios';

export async function GetUserNotifications(nik) {
  const response = await axios.post(
    'https://portal.bintang7.com/tara/notification/get-user-notifications',
    {
      nik: nik,
    },
  );

  const responseData = response.data;
  return responseData;
}
