import React from 'react';
import {View, StyleSheet} from 'react-native';

import GeneralNotificationList from './GeneralNotifications/GeneralNotificationList';

function GeneralNotification({data}) {
  return (
    <View style={styles.notificationsContainer}>
      <GeneralNotificationList data={data} />
    </View>
  );
}

export default GeneralNotification;

const styles = StyleSheet.create({
  notificationsContainer: {
    width: '100%',
    flex: 1,
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
