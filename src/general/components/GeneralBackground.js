import {StyleSheet, ImageBackground, Dimensions} from 'react-native';
import Colors from '../constants/Colors';

const dimensionWidth = Dimensions.get('window').width;
const dimensionHeight = Dimensions.get('window').height;

function GeneralBackground({children, containerStyle, bg}) {
  return (
    <ImageBackground
      source={bg ? bg : require('../assets/background.png')}
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
  },
});
