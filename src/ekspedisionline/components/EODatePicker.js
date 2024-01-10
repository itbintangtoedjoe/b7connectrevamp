import React from 'react';
import {View, Text, StyleSheet, Pressable, Dimensions} from 'react-native';

import Colors from '../../general/constants/Colors';
import Styles from '../../general/constants/Styles';

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
        <Text style={styles.fromDateText}>{formattedFromDate}</Text>
      </Pressable>
      <View style={styles.dateDividerContainer}></View>
      <Pressable
        onPress={() => onClickedTo()}
        style={({pressed}) => [
          styles.toDateContainer,
          pressed && Styles.pressed,
        ]}>
        <Text style={styles.toDateText}>{formattedToDate}</Text>
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
    borderColor: Colors.primaryColor,
  },
  toDateContainer: {
    height: '100%',
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: Colors.primaryColor,
    borderColor: Colors.primaryColor,
  },
  fromDateText: {
    fontWeight: '800',
    fontSize: 12,
    color: Colors.primaryColor,
  },
  toDateText: {
    fontWeight: '800',
    fontSize: 12,
    color: 'white',
  },
  dateDividerContainer: {
    width: '5%',
    height: 4,
    backgroundColor: Colors.primaryColor,
    borderRadius: 100,
  },
});
