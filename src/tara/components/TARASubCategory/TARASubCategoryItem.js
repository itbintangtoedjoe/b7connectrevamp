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
import GeneralIonicons from '../../../general/components/GeneralIonicons';
import PlusJakartaSansText from '../../../../fonts/PlusJakartaSansText';
import PoppinsText from '../../../../fonts/PoppinsText';

const dimensionWidth = Dimensions.get('window').width;

function TARASubCategoryItem({NamaSubkategori, Id}) {
  const navigation = useNavigation();

  let content = (
    <View style={styles.container}>
      <PoppinsText weight="Bold" style={styles.titleText}>
        {NamaSubkategori}
      </PoppinsText>
      <GeneralIonicons
        name="documents"
        size={32}
        color={Colors.primaryColor50}
      />
    </View>
  );

  function DetailHandler() {
    navigation.navigate('TARADocument', {
      subKategori: NamaSubkategori,
      id: Id,
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

export default React.memo(TARASubCategoryItem);

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 8,
  },
  container: {
    flexDirection: 'row',
    width: dimensionWidth * 0.9,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  titleText: {
    color: Colors.TARAPrimary,
    marginBottom: Platform.OS === 'ios' ? 0 : -4,
  },
});
