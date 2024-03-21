import React from 'react';
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const dimensionWidth = Dimensions.get('window').width;

function GeneralBanners({bannerData}) {
  return (
    <View style={styles.bannersContainer}>
      <Carousel
        loop
        width={dimensionWidth}
        height="auto"
        autoPlay={true}
        data={bannerData}
        scrollAnimationDuration={2000}
        pagingEnabled={false}
        snapEnabled={true}
        renderItem={({item}) => (
          <Image source={{uri: item.ImageUrl}} style={styles.image} />
        )}
      />
    </View>
  );
}

export default GeneralBanners;

const styles = StyleSheet.create({
  bannersContainer: {},
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
