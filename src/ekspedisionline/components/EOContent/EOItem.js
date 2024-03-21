import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Colors from '../../../general/constants/Colors';
import Styles from '../../../general/constants/Styles';
import {
  GetFormattedDate,
  GetFormattedName,
} from '../../../general/utils/HelperMethods';
import PlusJakartaSansText from '../../../../fonts/PlusJakartaSansText';
import PoppinsText from '../../../../fonts/PoppinsText';

const dimensionWidth = Dimensions.get('window').width;

const EOItem = React.memo(
  ({ID, CreationDate, ResiBarang, NamaPengirim, NamaPenerima, Status}) => {
    const navigation = useNavigation();

    const formattedDate = GetFormattedDate(CreationDate);
    const namaPenerima = GetFormattedName(NamaPenerima);
    const namaPengirim = GetFormattedName(NamaPengirim);

    function DetailHandler() {
      navigation.navigate('EODetail', {
        id: ID,
      });
    }

    const ContentItem = ({title, desc, bold}) => {
      return (
        <View style={styles.contentContainer}>
          <PoppinsText weight="Medium" style={styles.titleText}>
            {title}
          </PoppinsText>
          <PoppinsText
            weight={bold ? 'Bold' : 'Medium'}
            style={[styles.descText]}>
            {desc}
          </PoppinsText>
        </View>
      );
    };

    let content = (
      <View style={styles.container}>
        <ContentItem title="Tanggal Dibuat" desc={formattedDate} />
        <ContentItem title="Resi Barang" desc={ResiBarang} />
        <ContentItem title="Pengirim" desc={namaPengirim} bold />
        <ContentItem title="Penerima" desc={namaPenerima} bold />
        <ContentItem title="Status" desc={Status} />
      </View>
    );

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
  },
);

export default EOItem;

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
    marginVertical: 2,
  },
  titleText: {
    color: 'grey',
    fontSize: 12,
    marginBottom: Platform.OS === 'ios' ? 0 : -2,
  },
  descText: {
    color: Colors.EOPrimary,
    fontSize: 12,
    flexWrap: 'wrap',
    textAlign: 'right',
    marginBottom: Platform.OS === 'ios' ? 0 : -2,
  },
});
