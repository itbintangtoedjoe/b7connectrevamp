import React from 'react';
import {StyleSheet, Text, View, Platform, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../constants/Colors';
import GeneralPressableIcon from './GeneralPressableIonicons';
import GeneralIonicons from './GeneralIonicons';
import PlusJakartaSansText from '../../../fonts/PlusJakartaSansText';
import PoppinsText from '../../../fonts/PoppinsText';

function GeneralHeader({
  title,
  offline,
  iconName,
  iconSize,
  iconColor,
  containerStyle,
  textStyle,
  children,
  backButtonColor,
}) {
  const navigation = useNavigation();

  return (
    <View style={[styles.headerContainer, containerStyle]}>
      <View style={styles.leftContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={backButtonColor ? backButtonColor : Colors.primaryColor}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.middleContainer}>
        <PoppinsText weight="Bold" style={[styles.headerTitleText, textStyle]}>
          {title ? title : 'Page'}
          {/* {'Halo Bosku Apa Kabarmuu Hehehe'} */}
        </PoppinsText>
        {offline && (
          <PoppinsText weight="Bold" style={styles.offlineContainer}>
            <Text style={styles.offlineText}>Offline</Text>
          </PoppinsText>
        )}
      </View>
      <View style={styles.rightContainer}>
        {/* <TouchableOpacity onPress={() => {}}>
          <Text>Halo</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

export default GeneralHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  middleContainer: {
    flex: 8,
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  headerTitleText: {
    fontSize: 16,
    color: 'black',
    marginBottom: Platform.OS === 'ios' ? 0 : -6,
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
    fontSize: 12,
    color: Colors.primaryColor,
  },
});
