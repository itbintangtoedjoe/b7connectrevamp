import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import Colors from '../../general/constants/Colors';
import Styles from '../../general/constants/Styles';

const dimensionWidth = Dimensions.get('window').width;

function EODetailBody({JenisBarang, NamaPengirim, NamaPenerima, Keterangan}) {
  return (
    <View style={[styles.bodyCardContainer, Styles.shadow]}>
      <Text style={styles.titleText}>Keterangan Pengiriman</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.detailText}>Jenis Barang</Text>
        <Text style={styles.detailContentText}>{JenisBarang}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.detailText}>Pengirim</Text>
        <Text style={styles.detailContentText}>{NamaPengirim}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.detailText}>Penerima</Text>
        <Text style={styles.detailContentText}>{NamaPenerima}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.detailText}>Keterangan</Text>
        <Text style={styles.detailContentText}>{Keterangan}</Text>
      </View>
    </View>
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
    fontWeight: '800',
    color: Colors.primaryColor,
    marginBottom: 8,
  },
  detailText: {
    fontWeight: 'bold',
    color: Colors.primaryColor,
  },
  detailContentText: {
    color: 'black',
  },
});
