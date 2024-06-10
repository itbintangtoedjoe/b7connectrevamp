import axios from 'axios';

export async function NetworkCheck() {
  const response = await axios.get(
    'https://portal.bintang7.com/testingapi/api/check-connection',
  );

  return response;
}

export async function Authentication(
  email,
  password,
  devicePlatform = null,
  userDeviceID = null,
) {
  const response = await axios.post(
    //old api
    // 'https://portal.bintang7.com/tara/users/get-active-user',
    'https://portal.bintang7.com/tara/b7connect/user-login',
    {email, password, devicePlatform, userDeviceID},
  );

  const responseData = response.data;

  return responseData;
}

export async function AuthenticationEO(data) {
  const dataUser = data.Data;
  const user = {
    nik: dataUser.NIK,
    nama_role: dataUser.Role.NamaRole,
    nama_user: dataUser.NamaUser,
    email: dataUser.Email,
    user_ad: dataUser.UserAD,
    poin_bisa: dataUser.TotalPoinBISA,
    is_admin: dataUser.IsAdmin,
    tanggal_awal_redeem: dataUser.TanggalAwalRedeem,
    tanggal_akhir_redeem: dataUser.TanggalAkhirRedeem,
    jumlah_notifikasi: dataUser.JumlahNotifikasi,
  };

  const response = await axios.post(
    'https://portal.bintang7.com/ekspedisionline/users/get-user-data',
    user,
  );
  const responseData = response.data;
  return responseData;
}

export async function AuthenticationRadius(username, password) {
  const response = await axios.post(
    'https://portal.bintang7.com/auth-prod/login',
    {username: username, password: password},
  );

  const responseData = response.data;
  return responseData;
}

export async function ForgotPassword(email) {
  const response = await axios.post(
    'https://portal.bintang7.com/tara/users/change-password',
    {email: email},
  );

  return response.data;
}

export async function ChangePassword(nik, password) {
  const response = await axios.post(
    'https://portal.bintang7.com/tara/users/change-password-authenticated',
    {
      nik: nik,
      password: password,
    },
  );

  return response.data;
}

export async function RequestOTP(email) {
  const response = await axios.post(
    'https://portal.bintang7.com/tara/b7connect/request-otp',
    {
      email: email,
    },
  );

  return response.data;
}

export async function VerifyOTP(email, otp) {
  const response = await axios.post(
    'https://portal.bintang7.com/tara/b7connect/verify-otp',
    {
      email: email,
      otp: otp,
    },
  );

  return response.data;
}

export async function LockingUserAccount(email) {
  const response = await axios.post(
    'https://portal.bintang7.com/tara/b7connect/check-otp-validity',
    {
      email: email,
      otp: otp,
    },
  );

  return response.data;
}

export async function GetUserNotifications(nik, checkAmount) {
  let amount = 0;
  const response = await axios.post(
    'https://portal.bintang7.com/tara/notification/get-user-notifications',
    {
      nik: nik,
    },
  );

  const responseData = response.data;

  for (const key in responseData) {
    if (responseData[key].IsRead === false) {
      amount++;
    }
  }
  if (checkAmount) {
    return amount;
  } else {
    return responseData;
  }
}

export async function SetNotificationIsRead(notifId) {
  const response = await axios.post(
    'https://portal.bintang7.com/tara/notification/read-receipt',
    {NotificationID: notifId},
  );

  return response;
}

export async function SetAllNotificationIsRead(nik) {
  const response = await axios.post(
    'https://portal.bintang7.com/tara/notification/read-all-user-notifications',
    {nik: nik},
  );

  return response;
}

export async function GetAppBanners() {
  const response = await axios.get(
    'https://portal.bintang7.com/tara/b7connect/get-banners',
  );

  return response.data;
}

export async function GetNews() {
  const response = await axios.get(
    'https://portal.bintang7.com/tara/b7connect/get-news',
  );

  return response.data;
}

export async function GetBulletins() {
  const response = await axios.get(
    'https://portal.bintang7.com/tara/b7connect/get-bulletin-board',
  );

  return response.data;
}

export async function SaveUserToken(nik, token) {
  const response = await axios.post(
    'https://portal.bintang7.com/tara/users/save-user-token',
    {nik: nik, userToken: token},
  );

  return response.data;
}

export async function DeactivateAccount(nik) {
  const response = await axios.post(
    'https://portal.bintang7.com/tara/b7connect/user-request-deactivation',
    {nik: nik},
  );

  return response.data;
}

export async function CheckAppVersion(appVersion, userID, userPlatform) {
  const response = await axios.post(
    'https://portal.bintang7.com/tara/b7connect/check-app-version',
    {
      appVersion,
      userID,
      userPlatform,
    },
  );

  return response.data;
}

export async function UnlinkDevice(email) {
  const response = await axios.post(
    'https://portal.bintang7.com/tara/b7connect/unlink-device',
    {
      email,
    },
  );

  return response.data;
}
