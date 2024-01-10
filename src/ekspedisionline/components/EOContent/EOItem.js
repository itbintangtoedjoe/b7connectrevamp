import React from 'react';
import {View, Text, StyleSheet, Pressable, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Colors from '../../../general/constants/Colors';
import Styles from '../../../general/constants/Styles';
import {
  GetFormattedDate,
  GetFormattedName,
} from '../../../general/utils/HelperMethods';

const dimensionWidth = Dimensions.get('window').width;

function EOItem({
  ID,
  CreationDate,
  ResiBarang,
  NamaPengirim,
  NamaPenerima,
  Status,
  DetailStatus,
  JenisBarang,
  Keterangan,
}) {
  const navigation = useNavigation();

  const formattedDate = GetFormattedDate(CreationDate);
  const namaPenerima = GetFormattedName(NamaPenerima);
  const namaPengirim = GetFormattedName(NamaPengirim);
  const formattedJenis = GetFormattedName(JenisBarang);
  const formattedKeterangan = GetFormattedName(Keterangan);

  let content = (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>Tanggal Dibuat</Text>
        <Text style={styles.descText}>{formattedDate}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>Resi Barang</Text>
        <Text style={styles.descText}>{ResiBarang}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>Pengirim</Text>
        <Text style={[styles.descText, {fontWeight: 'bold'}]}>
          {namaPengirim}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>Penerima</Text>
        <Text style={[styles.descText, {fontWeight: 'bold'}]}>
          {namaPenerima}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>Status</Text>
        <Text style={styles.descText}>{Status}</Text>
      </View>
    </View>
  );

  function DetailHandler() {
    navigation.navigate('EODetail', {
      id: ID,
      resi: ResiBarang,
      pengirim: namaPengirim,
      penerima: namaPenerima,
      status: Status,
      detail: DetailStatus,
      jenis: formattedJenis,
      keterangan: formattedKeterangan,
    });
  }

  return (
    <Pressable
      onPress={DetailHandler}
      style={({pressed}) => [
        styles.itemContainer,
        Styles.shadow,
        pressed && Styles.pressed,
      ]}>
      {content}
    </Pressable>
  );
}

export default React.memo(EOItem);

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 8,
  },
  container: {
    width: dimensionWidth * 0.9,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    justifyContent: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  titleText: {
    color: 'grey',
    fontWeight: '500',
    fontSize: 12,
  },
  descText: {
    color: Colors.primaryColor,
    fontWeight: '500',
    fontSize: 12,
    flexWrap: 'wrap',
    textAlign: 'right',
  },
});
