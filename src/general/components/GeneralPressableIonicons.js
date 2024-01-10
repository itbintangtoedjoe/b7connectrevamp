import {StyleSheet, Text, Pressable} from 'react-native';

import Styles from '../constants/Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

function GeneralPressableIcon({onPress, name, size, color}) {
  Ionicons.loadFont().then();
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => pressed && Styles.pressed}>
      <Ionicons
        name={name ? name : 'person-circle'}
        size={size ? size : 24}
        color={color ? color : 'black'}
      />
    </Pressable>
  );
}

export default GeneralPressableIcon;

const styles = StyleSheet.create({});
