import React from 'react';
import {
  View,
  Alert,
  Text,
  ImageBackground,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import {Notifications} from 'react-native-notifications';
import Toast from 'react-native-toast-message';
import ScreenGuardModule from 'react-native-screenguard';

import Colors from '../src/general/constants/Colors';
import Styles from '../src/general/constants/Styles';
import * as General from '../src/general/screens/GeneralIndex';
import * as CAM from '../src/cam/screens/CAMIndex';
import * as EO from '../src/ekspedisionline/screens/EOIndex';
import * as TARA from '../src/tara/screens/TARAIndex';
import GeneralIonicons from '../src/general/components/GeneralIonicons';
import {
  Authentication,
  AuthenticationEO,
  NetworkCheck,
} from '../src/general/utils/APIMethods';
import {AuthContext} from '../src/general/context/auth-context';
import {SplashNetworkErrorHandler} from '../src/general/utils/HelperMethods';
import PoppinsText from '../fonts/PoppinsText';
import GeneralButton from '../src/general/components/GeneralButton';
import GeneralLoadingOverlay from '../src/general/components/GeneralLoadingOverlay';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const rnBiometrics = new ReactNativeBiometrics();

const dimensionWidth = Dimensions.get('window').width;

function TARAHomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="TARAHome" component={TARA.HomeScreen} />
      <Stack.Screen
        name="TARAHomeDocumentViewer"
        component={TARA.DocumentViewerScreen}
      />
    </Stack.Navigator>
  );
}

function TARADocumentStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="TARACategory" component={TARA.CategoryScreen} />
      <Stack.Screen name="TARASubCategory" component={TARA.SubCategoryScreen} />
      <Stack.Screen name="TARADocument" component={TARA.DocumentScreen} />
      <Stack.Screen
        name="TARADocumentViewer"
        component={TARA.DocumentViewerScreen}
      />
    </Stack.Navigator>
  );
}

function TARABottomTab() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'TARAHomeStack') {
            iconName = focused ? 'home' : 'home-outline';
            title = focused ? 'Beranda' : '';
          } else if (route.name === 'TARADocumentStack') {
            iconName = focused ? 'documents' : 'documents-outline';
            title = focused ? 'Dokumen' : '';
          }
          return (
            <>
              <GeneralIonicons name={iconName} size={24} color={color} />
              {focused && (
                <PoppinsText
                  weight="Bold"
                  style={{
                    marginBottom: Platform.OS === 'ios' ? 0 : -4,
                    fontSize: 10,
                    color: 'white',
                  }}>
                  {title}
                </PoppinsText>
              )}
            </>
          );
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: [
          {
            flex: 1,
            position: 'absolute',
            justifyContent: 'center',
            backgroundColor: Colors.TARAPrimary,
          },
          Styles.shadow,
        ],
        tabBarHideOnKeyboard: true,
      })}>
      <Tab.Screen
        name="TARAHomeStack"
        component={TARAHomeStack}
        options={{
          title: 'Home',
        }}
      />
      <Tab.Screen
        name="TARADocumentStack"
        component={TARADocumentStack}
        options={{
          title: 'Document',
        }}
      />
    </Tab.Navigator>
  );
}

function EOStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="EOHome" component={EO.HomeScreen} />
      <Stack.Screen name="EOScan" component={EO.ScanPackageScreen} />
      <Stack.Screen name="EOOngoing" component={EO.OngoingDeliveryScreen} />
      <Stack.Screen name="EOHistory" component={EO.HistoryScreen} />
      <Stack.Screen name="EODetail" component={EO.DeliveryDetailScreen} />
    </Stack.Navigator>
  );
}

function CAMStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="CAMHome" component={CAM.HomeScreen} />
      <Stack.Screen name="CAMDetail" component={CAM.DetailScreen} />
      <Stack.Screen name="CAMAttachment" component={CAM.AttachmentScreen} />
    </Stack.Navigator>
  );
}

function Authenticated() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={General.HomeScreen} />
      <Stack.Screen
        name="Notification"
        component={General.NotificationScreen}
      />
      <Stack.Screen name="Profile" component={General.ProfileScreen} />
      <Stack.Screen
        name="ChangePassword"
        component={General.ChangePasswordScreen}
      />
      <Stack.Screen name="OTP" component={General.OTPScreen} />
      <Stack.Screen name="NewsDetail" component={General.NewsDetailScreen} />
      <Stack.Screen name="CAM" component={CAMStack} />
      <Stack.Screen name="EO" component={EOStack} />
      <Stack.Screen name="TARA" component={TARABottomTab} />
      <Stack.Screen name="NotAuthenticated" component={NotAuthenticated} />
    </Stack.Navigator>
  );
}

function AuthenticatedAuth() {
  const [authenticationResult, setAuthenticationResult] = React.useState(null);
  const [retry, setRetry] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    async function handleAuthenticate() {
      rnBiometrics
        .simplePrompt({
          promptMessage: 'Authenticate to access the app',
        })
        .then(success => {
          if (success.success) {
            setAuthenticationResult(true);
          } else {
            setAuthenticationResult(false);
          }
        })
        .catch(error => {
          setError(true);
          setAuthenticationResult(false);
        });
    }

    rnBiometrics.isSensorAvailable().then(resultObject => {
      const {available, biometryType} = resultObject;
      if (available) {
        handleAuthenticate();
      } else {
        setAuthenticationResult(true);
      }
    });
  }, [retry]);

  function retryHandler() {
    setRetry(!retry);
    setError(false);
  }

  if (authenticationResult === null) {
    return (
      <>
        <StatusBar
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
          backgroundColor={Colors.splash}
        />
        <ImageBackground
          source={
            Platform.OS === 'ios'
              ? require('../src/general/assets/authBGIOS.png')
              : require('../src/general/assets/authBGAndroid.png')
          }
          resizeMode="cover"
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <GeneralLoadingOverlay
            loadingColor="white"
            message="Authenticating..."
          />
        </ImageBackground>
      </>
    );
  } else if (!authenticationResult) {
    return (
      <>
        <StatusBar
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
          backgroundColor={Colors.splash}
        />
        <ImageBackground
          source={
            Platform.OS === 'ios'
              ? require('../src/general/assets/authBGIOS.png')
              : require('../src/general/assets/authBGAndroid.png')
          }
          resizeMode="cover"
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <PoppinsText weight="SemiBold" style={{color: 'white', fontSize: 16}}>
            Authenticate
          </PoppinsText>
          <GeneralButton
            onPress={retryHandler}
            buttonStyle={{
              width: dimensionWidth * 0.5,
              marginVertical: 16,
              backgroundColor: 'white',
            }}
            textStyle={{color: Colors.primaryColor}}>
            Authenticate
          </GeneralButton>
          {error && (
            <PoppinsText
              weight="Medium"
              style={{
                color: 'white',
                marginBottom: Platform.OS === 'ios' ? 0 : -2,
              }}>
              Biometrics error, Please try again later.
            </PoppinsText>
          )}
        </ImageBackground>
      </>
    );
  }

  return <Authenticated />;
}

function NotAuthenticated() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Authentication"
        component={General.AuthenticationScreen}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={General.ForgotPasswordScreen}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={General.RegisterUserScreen}
      />
      <Stack.Screen name="Authenticated" component={Authenticated} />
    </Stack.Navigator>
  );
}

function Splash() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={General.SplashScreen} />
    </Stack.Navigator>
  );
}

function CheckAuth() {
  const navigation = useNavigation();
  const authCtx = React.useContext(AuthContext);
  const [authStatus, setAuthStatus] = React.useState(null);
  const [refresh, setRefresh] = React.useState(false);

  async function NetworkRetryHandler() {
    setRefresh(!refresh);
  }

  React.useEffect(() => {
    async function fetchAsyncStorage() {
      const storedEmail = await AsyncStorage.getItem('email');
      const storedPassword = await AsyncStorage.getItem('password');
      if (storedEmail && storedPassword) {
        try {
          const response = await Authentication(storedEmail, storedPassword);
          if (response.Status === false) {
            setAuthStatus(false);
            await AsyncStorage.removeItem('email');
            await AsyncStorage.removeItem('password');
            return;
          }
          const responseEO = await AuthenticationEO(response);
          //code here

          //cek status otp local, kalau masih valid
          authCtx.Authenticate(response);
          authCtx.AuthenticateEO(responseEO);
          setAuthStatus(true);
        } catch (err) {
          const response = await SplashNetworkErrorHandler(err);
          if (response === 'No connection') {
            Alert.alert(
              "Couldn't connect to a network",
              'Please connect your device to a network',
              [
                {
                  text: 'Retry',
                  onPress: NetworkRetryHandler,
                },
              ],
              {cancelable: false},
            );
          }
        }
      } else {
        setTimeout(() => {
          setAuthStatus(false);
        }, 1000);
      }
    }

    fetchAsyncStorage();
  }, [refresh]);

  return (
    <>
      {authStatus === null && <Splash />}
      {authStatus === true && <AuthenticatedAuth />}
      {authStatus === false && <NotAuthenticated />}
    </>
  );
}

function Root() {
  const authCtx = React.useContext(AuthContext);
  const navigation = useNavigation();

  React.useMemo(async () => {
    Notifications.registerRemoteNotifications();
    Notifications.ios.registerRemoteNotifications({
      providesAppNotificationSettings: true,
      provisional: true,
      carPlay: true,
      criticalAlert: true,
    });
    const isRegist = await Notifications.ios.checkPermissions();

    Notifications.events().registerRemoteNotificationsRegistered(
      async event => {
        // console.log('Device Token Received', event.deviceToken);
        const storedToken = await AsyncStorage.getItem('token');
        // console.log('Received: ', event.deviceToken, '\nStored: ', storedToken);
        if (storedToken !== event.deviceToken)
          authCtx.SaveDeviceToken(event.deviceToken);
      },
    );

    Notifications.events().registerRemoteNotificationsRegistrationFailed(
      event => {
        console.error(event);
      },
    );

    Notifications.events().registerNotificationReceivedForeground(
      (notification, completion) => {
        Toast.show({
          type: 'notifToast',
          text1: notification.payload['gcm.notification.title'],
          text2: notification.payload['gcm.notification.body'],
          position: 'top',
          props: {bgColor: Colors.primaryColor100},
          onPress: () => navigation.navigate('Notification'),
        });
        completion({alert: true, sound: true, badge: false});
      },
    );
  }, []);

  ScreenGuardModule.register(
    //insert any hex color you want here, default black if null or empty
    Colors.primaryColor,
    _ => {},
  );

  let isScreenshotAlertShown = false;

  ScreenGuardModule.registerScreenshotEventListener(() => {
    if (!isScreenshotAlertShown) {
      isScreenshotAlertShown = true;
      Alert.alert('Taking a screenshot of the app is prohibited', '', [
        {
          text: 'OK',
          onPress: () => {
            // Reset the flag after the alert is dismissed
            isScreenshotAlertShown = false;
          },
        },
      ]);
    }
  });

  return <CheckAuth />;
}

export default Root;
