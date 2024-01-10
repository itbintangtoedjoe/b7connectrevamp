import {StyleSheet, ImageBackground} from 'react-native';
import Colors from '../constants/Colors';

function GeneralBackground({children, containerStyle}) {
  return (
    <ImageBackground
      source={require('../assets/background.png')}
      resizeMode="cover"
      style={[styles.imageBackground, containerStyle]}>
      {children}
    </ImageBackground>
  );
}

export default GeneralBackground;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
});
