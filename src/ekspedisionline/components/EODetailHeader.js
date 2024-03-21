import React from 'react';
import {View, Text, StyleSheet, Dimensions, Platform} from 'react-native';

import Colors from '../../general/constants/Colors';
import Styles from '../../general/constants/Styles';
import GeneralLoadingOverlay from '../../general/components/GeneralLoadingOverlay';
import PoppinsText from '../../../fonts/PoppinsText';

const dimensionWidth = Dimensions.get('window').width;

function EODetailHeader({isLoading, ResiBarang, Status}) {
  let content = (
    <>
      <View style={styles.contentContainer}>
        <PoppinsText weight="Bold" style={styles.titleText}>
          Resi Pengiriman
        </PoppinsText>
        <PoppinsText style={styles.titleText}>{ResiBarang}</PoppinsText>
      </View>
      <View style={styles.contentContainer}>
        <PoppinsText weight="Bold" style={styles.titleText}>
          Status
        </PoppinsText>
        <PoppinsText style={styles.titleText}>{Status}</PoppinsText>
      </View>
    </>
  );

  return (
    <View style={[styles.topCardContainer, Styles.shadow]}>{content}</View>
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
    backgroundColor: Colors.EOPrimary,
  },
  contentContainer: {
    marginVertical: 4,
  },
  titleText: {
    fontSize: 16,
    color: 'white',
    marginBottom: Platform.OS === 'ios' ? 0 : -4,
  },
  detailText: {
    color: 'black',
  },
  loadingContainer: {
    width: '100%',
    height: 125,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
