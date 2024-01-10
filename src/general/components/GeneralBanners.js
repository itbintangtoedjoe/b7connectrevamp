import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

function GeneralBanners() {
  const bannerUri =
    'https://portal.bintang7.com/TARA/Template/images/banners/banner3.png';

  return (
    <View style={styles.bannersContainer}>
      <Image style={styles.image} source={{uri: bannerUri}} />
    </View>
  );
}

export default GeneralBanners;

const styles = StyleSheet.create({
  bannersContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
