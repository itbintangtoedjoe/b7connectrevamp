import React from 'react';
import {View, StyleSheet, ImageBackground, Dimensions} from 'react-native';

import Styles from '../../constants/Styles';

const DimensionWidth = Dimensions.get('window').width;

function GeneralBulletinBoardItem({uri}) {
  return (
    <View style={[styles.shadowContainer, Styles.shadow]}>
      <View style={styles.bulletinBoardContainer}>
        <View style={styles.bulletinBoardImage}>
          <ImageBackground
            source={uri}
            resizeMode="cover"
            style={styles.imageBackground}></ImageBackground>
        </View>
      </View>
    </View>
  );
}

export default React.memo(GeneralBulletinBoardItem);

const styles = StyleSheet.create({
  shadowContainer: {
    marginHorizontal: DimensionWidth * 0.04,
    marginTop: 8,
    marginBottom: 24,
    borderRadius: 12,
    backgroundColor: 'black',
  },
  bulletinBoardContainer: {
    width: DimensionWidth * 0.92,
    height: 'auto',
    aspectRatio: 1 / 1.414,
    borderRadius: 12,
    backgroundColor: 'black',
    overflow: 'hidden',
  },
  bulletinBoardImage: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
  },
});
