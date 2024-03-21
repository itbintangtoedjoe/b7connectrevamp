import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenGuardModule from 'react-native-screenguard';
import Toast from 'react-native-toast-message';

const dimensionWidth = Dimensions.get('window').width;

import Colors from '../constants/Colors';
import * as GeneralComponents from '../components/GeneralComponents';
import {AuthContext} from '../context/auth-context';
import {
  GetAppBanners,
  GetBulletins,
  GetNews,
  GetUserNotifications,
} from '../utils/APIMethods';
import {NetworkErrorHandler} from '../utils/HelperMethods';
import Strings from '../constants/Strings';

function HomeScreen({navigation}) {
  const authCtx = React.useContext(AuthContext);
  const [notificationAmount, setNotificationAmount] = React.useState(null);
  const [bannerData, setBannerData] = React.useState([]);
  const [newsData, setNewsData] = React.useState([]);
  const [bulletinData, setBulletinData] = React.useState([]);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');

      Platform.OS === 'android'
        ? StatusBar.setBackgroundColor('white')
        : undefined;
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      async function checkDefaultPass() {
        const storedPassword = await AsyncStorage.getItem('password');
        const nextTimeCheckOTP = await AsyncStorage.getItem('nextTimeCheckOTP');
        const otpLocalStatus = await AsyncStorage.getItem('otpLocalStatus');
        // console.log('nextTimeCheckOTP: ', nextTimeCheckOTP);
        // console.log('otpLocalStatus: ', otpLocalStatus);
        if (
          authCtx.Email != Strings.emailDemo
          // &&
          // authCtx.Email !== 'feliciabrilliantb@gmail.com' &&
          // authCtx.Email !== 'dennyirawan9@gmail.com'
        ) {
          if (
            otpLocalStatus === 'valid' &&
            new Date(nextTimeCheckOTP) >= new Date()
          ) {
            if (storedPassword === 'b7c#default') {
              navigation.navigate('ChangePassword');
            }
          } else {
            AsyncStorage.removeItem('nextTimeCheckOTP');
            AsyncStorage.removeItem('otpLocalStatus');
            navigation.navigate('OTP');
          }
        }
      }

      async function userNotifications(nik) {
        try {
          const response = await GetUserNotifications(nik, true);
          setNotificationAmount(response);
        } catch (err) {
          NetworkErrorHandler(err);
        }
      }

      async function appBanners() {
        try {
          const response = await GetAppBanners();
          setBannerData(response);
        } catch (err) {
          NetworkErrorHandler(err);
        }
      }

      async function news() {
        try {
          const response = await GetNews();
          setNewsData(response);
        } catch (err) {
          NetworkErrorHandler(err);
        }
      }

      async function bulletinBoard() {
        try {
          const response = await GetBulletins();
          setBulletinData(response);
        } catch (err) {
          NetworkErrorHandler(err);
        }
      }

      checkDefaultPass();
      appBanners();
      news();
      bulletinBoard();
      userNotifications(authCtx.NIK);
    }, []),
  );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={styles.rootContainer}>
        <GeneralComponents.HomeHeader
          username={authCtx.Username}
          notifAmount={notificationAmount}
        />
        <ScrollView
          style={styles.bodyContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.bannersContainer}>
            <GeneralComponents.Banners bannerData={bannerData} />
          </View>
          <View style={styles.poinbisaContainer}>
            <GeneralComponents.PoinBisa />
          </View>
          <View style={styles.appsContainer}>
            <GeneralComponents.Apps />
          </View>
          <View style={styles.newsContainer}>
            <GeneralComponents.News data={newsData} />
            {newsData.length == 0 && (
              <View style={styles.newsPlaceholderContainer}>
                <GeneralComponents.LoadingOverlay
                  loadingColor="white"
                  message="Loading..."
                />
              </View>
            )}
          </View>
          <View style={styles.bulletinBoardContainer}>
            <GeneralComponents.BulletinBoard data={bulletinData} />
            {bulletinData.length == 0 && (
              <View style={styles.bulletinBoardContainer}>
                <GeneralComponents.LoadingOverlay
                  loadingColor="white"
                  message="Loading..."
                />
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  bodyContainer: {
    flex: 1,
  },
  bannersContainer: {
    width: dimensionWidth,
    height: 'auto',
    aspectRatio: 16 / 9,
    marginBottom: -16,
  },
  poinbisaContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  appsContainer: {
    paddingHorizontal: 16,
  },
  newsContainer: {
    marginTop: 16,
  },
  bulletinBoardContainer: {
    marginTop: 16,
  },
  newsPlaceholderContainer: {
    width: dimensionWidth * 0.92,
    height: 'auto',
    aspectRatio: 4 / 3,
    alignSelf: 'center',
    borderRadius: 12,
    marginVertical: 8,
    backgroundColor: 'black',
    overflow: 'hidden',
  },
  bulletinPlaceholderContainer: {
    width: dimensionWidth * 0.92,
    height: 'auto',
    aspectRatio: 210 / 297,
    alignSelf: 'center',
    borderRadius: 12,
    marginTop: 8,
    backgroundColor: 'black',
    overflow: 'hidden',
  },
});
