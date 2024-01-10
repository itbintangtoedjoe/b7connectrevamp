import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';

const DimensionWidth = Dimensions.get('window').width;

function GeneralNewsItem({uri, title, desc, overlay}) {
  return (
    <View style={[styles.shadowContainer, Styles.shadow]}>
      <View style={styles.newsContainer}>
        <View style={styles.newsImage}>
          <ImageBackground
            source={uri}
            resizeMode="cover"
            style={styles.imageBackground}>
            <ImageBackground
              source={overlay}
              resizeMode="cover"
              style={styles.imageBackground}>
              <View style={styles.newsHeadlineContainer}>
                <Text style={[styles.newsHeadlineTitleText]}>{title}</Text>
                <Text style={[styles.newsHeadlineDescText]}>{desc}</Text>
              </View>
            </ImageBackground>
          </ImageBackground>
        </View>
      </View>
    </View>
  );
}

export default React.memo(GeneralNewsItem);

const styles = StyleSheet.create({
  shadowContainer: {
    marginHorizontal: DimensionWidth * 0.04,
    marginTop: 8,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: 'black',
  },
  newsContainer: {
    width: DimensionWidth * 0.92,
    height: 250,
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
    //borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 4,
  },
  newsHeadlineContainer: {
    //borderWidth: 1,
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
    justifyContent: 'flex-end',
  },
  newsHeadlineTitleText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.secondaryColor,
  },
  newsHeadlineDescText: {
    flexWrap: 'wrap',
    fontSize: 14,
    minHeight: 40,
    color: 'white',
    textAlign: 'justify',
    marginTop: 4,
  },
});
