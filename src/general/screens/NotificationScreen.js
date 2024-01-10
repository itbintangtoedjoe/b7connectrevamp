import React from 'react';
import {Text, StatusBar, StyleSheet, SafeAreaView, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import * as GeneralComponents from '../components/GeneralComponents';
import {GetUserNotifications} from '../utils/APIMethods';
import {NetworkErrorHandler} from '../utils/HelperMethods';

function NotificationScreen({navigation}) {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [fallbackMessage, setFallbackMessage] =
    React.useState(`There's nothing here`);

  useFocusEffect(
    React.useCallback(() => {
      async function userNotifications(nik) {
        setIsLoading(true);
        try {
          const response = await GetUserNotifications(nik);
          setData(response);
          setIsLoading(false);
        } catch (err) {
          NetworkErrorHandler(err);
          setFallbackMessage('No connection');
          setIsLoading(false);
        }
      }

      userNotifications('210100117');
    }, []),
  );

  let content = (
    <View style={styles.fallbackContainer}>
      <Text style={styles.fallbackText}>
        {fallbackMessage ? fallbackMessage : 'Fallback Message'}
      </Text>
    </View>
  );

  if (data.length > 0) {
    content = <GeneralComponents.Notifications data={data} />;
  }

  if (isLoading) {
    content = (
      <GeneralComponents.LoadingOverlay message="Loading notification data..." />
    );
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
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  fallbackText: {
    fontSize: 16,
    color: 'black',
  },
});
