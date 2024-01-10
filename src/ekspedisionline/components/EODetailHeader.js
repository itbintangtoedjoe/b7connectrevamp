import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import Colors from '../../general/constants/Colors';
import Styles from '../../general/constants/Styles';

const dimensionWidth = Dimensions.get('window').width;

function EODetailHeader({ResiBarang, Status}) {
  return (
    <View style={[styles.topCardContainer, Styles.shadow]}>
      <View style={styles.contentContainer}>
        <Text style={[styles.titleText, {fontWeight: '700'}]}>
          Resi Pengiriman
        </Text>
        <Text style={[styles.titleText, {fontWeight: '400'}]}>
          {ResiBarang}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={[styles.titleText, {fontWeight: '700'}]}>Status</Text>
        <Text style={[styles.titleText, {fontWeight: '400'}]}>{Status}</Text>
      </View>
    </View>
  );
}

export default EODetailHeader;

const styles = StyleSheet.create({
  topCardContainer: {
    width: dimensionWidth * 0.9,
    marginBottom: 18,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: Colors.primaryColor,
  },
  contentContainer: {
    marginVertical: 4,
  },
  titleText: {
    fontSize: 16,
    color: 'white',
  },
  detailText: {
    color: 'black',
  },
});
