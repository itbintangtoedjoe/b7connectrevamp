import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Platform,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Colors from '../constants/Colors';

function SplashScreen() {
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle(
        Platform.OS === 'ios' ? 'dark-content' : 'light-content',
      );

      Platform.OS === 'android'
        ? StatusBar.setBackgroundColor(Colors.splash)
        : undefined;
    }, []),
  );
  return (
    <>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor={Colors.splash}
      />
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
