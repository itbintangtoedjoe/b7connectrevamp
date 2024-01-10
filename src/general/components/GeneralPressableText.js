import {StyleSheet, Text, Pressable} from 'react-native';
import Colors from '../constants/Colors';

function GeneralPressableText({children, onPress, textStyle}) {
  return (
    <Pressable
      style={({pressed}) => pressed && styles.pressed}
      onPress={onPress}>
      <Text style={[styles.pressableText, textStyle]}>{children}</Text>
    </Pressable>
  );
}

export default GeneralPressableText;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
  pressableText: {
    color: Colors.primaryColor,
  },
});
