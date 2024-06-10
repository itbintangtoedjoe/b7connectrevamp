import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SaveUserToken} from '../utils/APIMethods';
import {Notifications} from 'react-native-notifications';

export const AuthContext = React.createContext({
  isAuthenticated: false,
  NIK: '',
  Role: '',
  Username: '',
  Email: '',
  UserAD: '',
  TotalPoinBISA: '',
  IsAdmin: false,
  TanggalAwalRedeem: '',
  TanggalAkhirRedeem: '',
  JumlahNotifikasi: '',
  deviceToken: '',
  SaveDeviceToken: () => {},
  Authenticate: () => {},
  EOID: 0,
  EONIK: '',
  EOLokasi: '',
  EORole: '',
  EODepartemen: '',
  EOEmail: '',
  EOPassword: '',
  EOToken: '',
  EOIsActive: 0,
  EONamaUser: '',
  EOIDLokasi: 0,
  EONamaLokasi: '',
  EONamaRole: '',
  EONamaAdmin: '',
  AuthenticateEO: () => {},
  SignOut: () => {},
});

function AuthContextProvider({children}) {
  //TARA OR GENERAL
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [NIK, setNIK] = React.useState(null);
  const [Role, setRole] = React.useState(null);
  const [Username, setUsername] = React.useState(null);
  const [Email, setEmail] = React.useState(null);
  const [UserAD, setUserAD] = React.useState(null);
  const [TotalPoinBISA, setTotalPoinBISA] = React.useState(null);
  const [IsAdmin, setIsAdmin] = React.useState(false);
  const [TanggalAwalRedeem, setTanggalAwalRedeem] = React.useState(null);
  const [TanggalAkhirRedeem, setTanggalAkhirRedeem] = React.useState(null);
  const [JumlahNotifikasi, setJumlahNotifikasi] = React.useState(null);
  const [deviceToken, setDeviceToken] = React.useState(null);

  //EO
  const [EOID, setEOID] = React.useState(0);
  const [EONIK, setEONIK] = React.useState(null);
  const [EOLokasi, setEOLokasi] = React.useState(null);
  const [EORole, setEORole] = React.useState(null);
  const [EODepartemen, setEODepartemen] = React.useState(null);
  const [EOEmail, setEOEmail] = React.useState(null);
  const [EOPassword, setEOPassword] = React.useState(null);
  const [EOToken, setEOToken] = React.useState(null);
  const [EOIsActive, setEOIsActive] = React.useState(0);
  const [EONamaUser, setEONamaUser] = React.useState(null);
  const [EOIDLokasi, setEOIDLokasi] = React.useState(0);
  const [EONamaLokasi, setEONamaLokasi] = React.useState(null);
  const [EONamaRole, setEONamaRole] = React.useState(null);
  const [EONamaAdmin, setEONamaAdmin] = React.useState(null);

  async function Authenticate(data) {
    setIsAuthenticated(data.Status);
    setNIK(data.Data.NIK);
    setRole(data.Data.Role.NamaRole);
    setUsername(data.Data.NamaUser);
    setEmail(data.Data.Email);
    setUserAD(data.Data.UserAD);
    setTotalPoinBISA(data.Data.TotalPoinBISA);
    setIsAdmin(data.Data.IsAdmin);
    setTanggalAwalRedeem(data.Data.TanggalAwalRedeem);
    setTanggalAkhirRedeem(data.Data.setTanggalAkhirRedeem);
    setJumlahNotifikasi(data.Data.JumlahNotifikasi);
    const token = await AsyncStorage.getItem('token');
    // console.log(data.Data.NIK, token);
    if (data.Data.NIK && token) {
      const responseToken = await SaveUserToken(data.Data.NIK, token);
    }
  }

  async function SaveDeviceToken(token) {
    setDeviceToken(token);
    await AsyncStorage.setItem('token', token.toString());
  }

  async function AuthenticateEO(data) {
    setEOID(data.id);
    setEONIK(data.NIK);
    setEOLokasi(data.Lokasi);
    setEORole(data.Role);
    setEODepartemen(data.Departemen);
    setEOEmail(data.Email);
    setEOPassword(data.Password);
    setEOToken(data.Token);
    setEOIsActive(data.IsActive);
    setEONamaUser(data.NamaUser);
    setEOIDLokasi(data.IDLokasi);
    setEONamaLokasi(data.NamaLokasi);
    setEONamaRole(data.NamaRole);
    setEONamaAdmin(data.NamaAdmin);
  }

  async function SignOut() {
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('password');
    await AsyncStorage.removeItem('radiusPassword');
    await AsyncStorage.removeItem('radiusPasswordExp');
    await AsyncStorage.removeItem('nextTimeCheckOTP');
    await AsyncStorage.removeItem('otpLocalStatus');
  }

  const value = {
    isAuthenticated: isAuthenticated,
    NIK: NIK,
    Role: Role,
    Username: Username,
    Email: Email,
    UserAD: UserAD,
    TotalPoinBISA: TotalPoinBISA,
    IsAdmin: IsAdmin,
    TanggalAwalRedeem: TanggalAwalRedeem,
    TanggalAkhirRedeem: TanggalAkhirRedeem,
    JumlahNotifikasi: JumlahNotifikasi,
    deviceToken: deviceToken,
    Authenticate: Authenticate,
    SaveDeviceToken: SaveDeviceToken,
    EOID: EOID,
    EONIK: EONIK,
    EOLokasi: EOLokasi,
    EORole: EORole,
    EODepartemen: EODepartemen,
    EOEmail: EOEmail,
    EOPassword: EOPassword,
    EOToken: EOToken,
    EOIsActive: EOIsActive,
    EONamaUser: EONamaUser,
    EOIDLokasi: EOIDLokasi,
    EONamaLokasi: EONamaLokasi,
    EONamaRole: EONamaRole,
    EONamaAdmin: EONamaAdmin,
    AuthenticateEO: AuthenticateEO,
    SignOut: SignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
