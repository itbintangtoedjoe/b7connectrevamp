import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Pressable,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';
import PlusJakartaSansText from '../../../../fonts/PlusJakartaSansText';
import PoppinsText from '../../../../fonts/PoppinsText';

const DimensionWidth = Dimensions.get('window').width;

function GeneralNewsItem(item) {
  const navigation = useNavigation();

  function pressHandler() {
    navigation.navigate('NewsDetail', {item: item});
  }

  return (
    <Pressable
      onPress={pressHandler}
      style={({pressed}) => [
        styles.shadowContainer,
        Styles.shadow,
        pressed && Styles.pressed,
      ]}>
      <View style={styles.newsContainer}>
        <View style={styles.newsImage}>
          <ImageBackground
            source={{uri: item.thumbnail_url}}
            resizeMode="cover"
            style={styles.imageBackground}>
            <ImageBackground
              source={require('../../assets/newsOverlay.png')}
              resizeMode="cover"
              style={styles.imageBackground}>
              <View style={styles.newsHeadlineContainer}>
                <PoppinsText
                  numberOfLines={2}
                  weight="Bold"
                  style={[styles.newsHeadlineTitleText]}>
                  {item.title}
                </PoppinsText>
                <PoppinsText
                  numberOfLines={2}
                  style={[styles.newsHeadlineDescText]}>
                  {item.summary}
                </PoppinsText>
              </View>
            </ImageBackground>
          </ImageBackground>
        </View>
      </View>
    </Pressable>
  );
}

export default React.memo(GeneralNewsItem);

const styles = StyleSheet.create({
  shadowContainer: {
    marginHorizontal: DimensionWidth * 0.04,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: 'black',
  },
  newsContainer: {
    width: DimensionWidth * 0.92,
    height: 'auto',
    aspectRatio: 4 / 3,
    borderRadius: 12,
    backgroundColor: 'black',
    overflow: 'hidden',
  },
  newsImage: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
  },
  pointerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 4,
  },
  newsHeadlineContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
    justifyContent: 'flex-end',
  },
  newsHeadlineTitleText: {
    fontSize: 20,
    color: Colors.secondaryColor,
    marginBottom: Platform.OS === 'ios' ? 0 : -8,
  },
  newsHeadlineDescText: {
    flexWrap: 'wrap',
    fontSize: 14,
    minHeight: 40,
    color: 'white',
    textAlign: 'justify',
    marginTop: 4,
    marginBottom: Platform.OS === 'ios' ? 0 : -2,
  },
});
