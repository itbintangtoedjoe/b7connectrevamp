import {StyleSheet, Text, Pressable} from 'react-native';

import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import PlusJakartaSansText from '../../../fonts/PlusJakartaSansText';
import PoppinsText from '../../../fonts/PoppinsText';

function GeneralPressableText({children, onPress, textStyle, textWeight}) {
  return (
    <Pressable
      style={({pressed}) => pressed && Styles.pressed}
      onPress={onPress}>
      <PoppinsText
        weight={textWeight ? textWeight : 'SemiBold'}
        style={[styles.pressableText, textStyle]}>
        {children}
      </PoppinsText>
    </Pressable>
  );
}

export default GeneralPressableText;

const styles = StyleSheet.create({
  pressableText: {
    color: Colors.primaryColor,
  },
});
