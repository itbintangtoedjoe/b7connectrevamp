import React from 'react';
import {View, Text, StyleSheet, Dimensions, Platform} from 'react-native';

import Colors from '../../general/constants/Colors';
import Styles from '../../general/constants/Styles';
import GeneralLoadingOverlay from '../../general/components/GeneralLoadingOverlay';
import PoppinsText from '../../../fonts/PoppinsText';

const dimensionWidth = Dimensions.get('window').width;

function EODetailBody({
  isLoading,
  JenisBarang,
  NamaPengirim,
  NamaPenerima,
  Keterangan,
}) {
  let content = (
    <>
      <PoppinsText weight="Bold" style={styles.titleText}>
        Keterangan Pengiriman
      </PoppinsText>
      <View style={styles.contentContainer}>
        <PoppinsText weight="SemiBold" style={styles.detailText}>
          Jenis Barang
        </PoppinsText>
        <PoppinsText style={styles.detailContentText}>
          {JenisBarang}
        </PoppinsText>
      </View>
      <View style={styles.contentContainer}>
        <PoppinsText weight="SemiBold" style={styles.detailText}>
          Pengirim
        </PoppinsText>
        <PoppinsText style={styles.detailContentText}>
          {NamaPengirim}
        </PoppinsText>
      </View>
      <View style={styles.contentContainer}>
        <PoppinsText weight="SemiBold" style={styles.detailText}>
          Penerima
        </PoppinsText>
        <PoppinsText style={styles.detailContentText}>
          {NamaPenerima}
        </PoppinsText>
      </View>
      <View style={styles.contentContainer}>
        <PoppinsText weight="SemiBold" style={styles.detailText}>
          Keterangan
        </PoppinsText>
        <PoppinsText style={styles.detailContentText}>{Keterangan}</PoppinsText>
      </View>
    </>
  );

  return (
    <View style={[styles.bodyCardContainer, Styles.shadow]}>{content}</View>
  );
}

export default EODetailBody;

const styles = StyleSheet.create({
  bodyCardContainer: {
    width: dimensionWidth * 0.9,
    marginBottom: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  contentContainer: {
    marginVertical: 4,
  },
  titleText: {
    fontSize: 16,
    color: Colors.EOPrimary,
  },
  detailText: {
    color: Colors.EOPrimary,
    marginBottom: Platform.OS === 'ios' ? 0 : -2,
  },
  detailContentText: {
    color: 'black',
    marginBottom: Platform.OS === 'ios' ? 0 : -2,
  },
  loadingContainer: {
    width: '100%',
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
