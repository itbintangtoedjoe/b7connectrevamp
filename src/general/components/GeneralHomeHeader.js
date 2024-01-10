import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import GeneralPressableIcon from './GeneralPressableIonicons';

function GeneralHomeHeader() {
  const navigation = useNavigation();
  const username = '';

  return (
    <View style={[styles.headerContainer, Styles.shadow]}>
      <View style={styles.headerUserContainer}>
        <Text style={styles.welcomeText}>Welcome,</Text>
        <Text style={styles.usernameText}>
          {username ? username : 'Pengguna B7 Connect'}
        </Text>
      </View>
      <View style={styles.headerIconContainer}>
        <View style={styles.headerIcon}>
          <GeneralPressableIcon
            onPress={() => navigation.navigate('Notification')}
            name="notifications"
            color={Colors.primaryColor}
          />
        </View>
        <View style={styles.headerIcon}>
          <GeneralPressableIcon
            onPress={() => navigation.navigate('Profile')}
            name="settings"
            color={Colors.primaryColor}
          />
        </View>
      </View>
    </View>
  );
}

export default GeneralHomeHeader;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 5,
  },
  headerUserContainer: {
    justifyContent: 'center',
  },
  headerIconContainer: {
    flexDirection: 'row',
  },
  headerIcon: {
    marginLeft: 16,
    alignItems: 'center',
  },
  welcomeText: {
    fontWeight: 'normal',
    color: Colors.primaryColor,
  },
  usernameText: {
    fontWeight: 'bold',
    color: Colors.primaryColor,
    fontSize: 16,
  },
});
