import React from 'react';
import {
  Text,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  View,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import Colors from '../constants/Colors';
import * as GeneralComponents from '../components/GeneralComponents';
import {
  GetUserNotifications,
  SetAllNotificationIsRead,
} from '../utils/APIMethods';
import {NetworkErrorHandler} from '../utils/HelperMethods';
import {AuthContext} from '../context/auth-context';

const dimensionWidth = Dimensions.get('window').width;

function NotificationScreen({navigation}) {
  const authCtx = React.useContext(AuthContext);
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [fallbackMessage, setFallbackMessage] = React.useState(`No data found`);
  const [refresh, setRefresh] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');

      Platform.OS === 'android'
        ? StatusBar.setBackgroundColor('white')
        : undefined;
    }, []),
  );

  async function onRefresh() {
    setRefresh(!refresh);
  }

  useFocusEffect(
    React.useCallback(() => {
      async function userNotifications(nik) {
        setIsLoading(true);
        try {
          const response = await GetUserNotifications(nik);
          setData(response);
          setFallbackMessage('No data found');
          setIsLoading(false);
        } catch (err) {
          const networkResponse = await NetworkErrorHandler(err);
          if (networkResponse.length > 0) {
            setFallbackMessage(networkResponse);
          }
          setIsLoading(false);
        }
      }

      userNotifications(authCtx.NIK);
    }, [refresh]),
  );

  async function readAllNotificationHandler() {
    Alert.alert(
      'Read all notifications',
      'Are you sure you want to mark all notifications as read?',
      [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          onPress: async () => {
            await SetAllNotificationIsRead(authCtx.NIK);
            setRefresh(!refresh);
          },
        },
      ],
      {cancelable: true},
    );
    // console.log(response);
  }

  let content = (
    <GeneralComponents.Fallback
      refreshColor={Colors.primaryColor}
      fallbackMessage={fallbackMessage}
      onRefresh={onRefresh}
    />
  );

  if (data.length > 0) {
    content = (
      <GeneralComponents.Notifications data={data} onRefreshList={onRefresh} />
    );
  }

  if (isLoading) {
    content = <GeneralComponents.LoadingOverlay message="Loading..." />;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={styles.rootContainer}>
        <GeneralComponents.Background
          containerStyle={{
            justifyContent: 'flex-start',
            padding: 0,
            paddingTop: 12,
          }}>
          <GeneralComponents.Header title="Notification" />
          <View
            style={{
              width: dimensionWidth * 0.9,
              alignItems: 'flex-end',
              marginRight: 8,
              marginTop: 4,
            }}>
            <GeneralComponents.PressableText
              onPress={readAllNotificationHandler}
              textStyle={{
                textDecorationLine: 'underline',
                marginBottom: Platform.OS === 'ios' ? 0 : -4,
              }}>
              Mark all as read
            </GeneralComponents.PressableText>
          </View>
          {content}
        </GeneralComponents.Background>
      </SafeAreaView>
    </>
  );
}

export default NotificationScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});
