import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Platform,
} from 'react-native';

import Colors from '../../general/constants/Colors';
import Styles from '../../general/constants/Styles';
import PlusJakartaSansText from '../../../fonts/PlusJakartaSansText';
import PoppinsText from '../../../fonts/PoppinsText';

const dimensionWidth = Dimensions.get('window').width;

function EODatePicker({
  onClikedFrom,
  onClickedTo,
  formattedFromDate,
  formattedToDate,
}) {
  return (
    <View style={styles.datePickerContainer}>
      <Pressable
        onPress={() => onClikedFrom()}
        style={({pressed}) => [
          styles.fromDateContainer,
          pressed && Styles.pressed,
        ]}>
        <PoppinsText weight="Bold" style={styles.fromDateText}>
          {formattedFromDate}
        </PoppinsText>
      </Pressable>
      <View style={styles.dateDividerContainer}></View>
      <Pressable
        onPress={() => onClickedTo()}
        style={({pressed}) => [
          styles.toDateContainer,
          pressed && Styles.pressed,
        ]}>
        <PoppinsText weight="Bold" style={styles.toDateText}>
          {formattedToDate}
        </PoppinsText>
      </Pressable>
    </View>
  );
}

export default EODatePicker;

const styles = StyleSheet.create({
  datePickerContainer: {
    flexDirection: 'row',
    width: dimensionWidth * 0.9,
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  fromDateContainer: {
    height: '100%',
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: 'white',
    borderColor: Colors.EOPrimary,
  },
  toDateContainer: {
    height: '100%',
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: Colors.EOPrimary,
    borderColor: Colors.EOPrimary,
  },
  fromDateText: {
    fontSize: 12,
    color: Colors.EOPrimary,
    marginBottom: Platform.OS === 'ios' ? 0 : -4,
  },
  toDateText: {
    fontSize: 12,
    color: 'white',
    marginBottom: Platform.OS === 'ios' ? 0 : -4,
  },
  dateDividerContainer: {
    width: '5%',
    height: 4,
    backgroundColor: Colors.EOPrimary,
    borderRadius: 100,
  },
});
