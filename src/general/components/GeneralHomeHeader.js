import React from 'react';
import {Pressable, StyleSheet, Text, View, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import GeneralPressableIcon from './GeneralPressableIonicons';
import {GetFormattedName} from '../utils/HelperMethods';
import GeneralIonicons from './GeneralIonicons';
import PlusJakartaSansText from '../../../fonts/PlusJakartaSansText';
import PoppinsText from '../../../fonts/PoppinsText';

function GeneralHomeHeader({username, notifAmount}) {
  const navigation = useNavigation();

  return (
    <View style={[styles.headerContainer, Styles.shadow]}>
      <View style={styles.headerUserContainer}>
        <PoppinsText style={styles.welcomeText}>Welcome,</PoppinsText>
        <PoppinsText weight="Bold" style={styles.usernameText}>
          {username ? GetFormattedName(username) : 'Pengguna B7 Connect'}
        </PoppinsText>
      </View>
      <View style={styles.headerIconContainer}>
        <Pressable
          onPress={() => navigation.navigate('Notification')}
          style={({pressed}) => [styles.headerIcon, pressed && Styles.pressed]}>
          <GeneralIonicons
            name="notifications"
            color={Colors.primaryColor}
            size={28}
          />
          {notifAmount > 0 && (
            <View style={styles.notificationAmountContainer}>
              <Text style={styles.notifAmountText}>{notifAmount}</Text>
            </View>
          )}
        </Pressable>
        <View style={[styles.headerIcon, {marginLeft: 8}]}>
          <GeneralPressableIcon
            onPress={() => navigation.navigate('Profile')}
            name="settings-outline"
            color={Colors.primaryColor}
            size={28}
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
    //borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeText: {
    color: Colors.primaryColor,
    marginBottom: Platform.OS === 'ios' ? 0 : -4,
  },
  usernameText: {
    color: Colors.primaryColor,
    fontSize: 16,
    marginBottom: Platform.OS === 'ios' ? 0 : -4,
  },
  notificationAmountContainer: {
    width: 18,
    height: 'auto',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: -12,
    borderRadius: 100,
    backgroundColor: Colors.primaryColor100,
  },
  notifAmountText: {
    fontWeight: '900',
    fontSize: 10,
    color: Colors.primaryColor,
  },
});
