import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Platform,
} from 'react-native';
import Colors from '../constants/Colors';

function SplashScreen() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.splash} />
      <View style={styles.rootContainer}>
        <ImageBackground
          source={
            Platform.OS === 'ios'
              ? require('../assets/splashIOS.png')
              : require('../assets/splashAndroid.png')
          }
          resizeMode="cover"
          style={styles.image}></ImageBackground>
      </View>
    </>
  );
}

export default SplashScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
});
