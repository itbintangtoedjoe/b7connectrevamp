import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Colors from '../constants/Colors';
import GeneralPressableIcon from './GeneralPressableIonicons';
import GeneralIonicons from './GeneralIonicons';

function GeneralHeader({
  title,
  offline,
  iconName,
  iconSize,
  iconColor,
  containerStyle,
  textStyle,
}) {
  const navigation = useNavigation();

  return (
    <View style={[styles.headerContainer, containerStyle]}>
      {/* <GeneralPressableIcon
        onPress={() => navigation.pop()}
        name={iconName ? iconName : 'arrow-back'}
        size={iconSize ? iconSize : 28}
        color={iconColor ? iconColor : 'black'}
      /> */}
      <Text style={[styles.headerTitleText, textStyle]}>
        {title ? title : 'Title'}
      </Text>
      {offline && (
        <View style={styles.offlineContainer}>
          <Text style={styles.offlineText}>Offline</Text>
        </View>
      )}
      {/* <GeneralIonicons
        name={iconName ? iconName : 'arrow-back'}
        size={iconSize ? iconSize : 28}
        color="transparent"
      /> */}
    </View>
  );
}

export default GeneralHeader;

const styles = StyleSheet.create({
  headerContainer: {
    //borderWidth: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleText: {
    fontWeight: '800',
    fontSize: 20,
    color: 'black',
  },
  offlineContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 30,
    backgroundColor: Colors.primaryColor100,
  },
  offlineText: {
    fontWeight: '800',
    fontSize: 12,
    color: Colors.primaryColor,
  },
});
