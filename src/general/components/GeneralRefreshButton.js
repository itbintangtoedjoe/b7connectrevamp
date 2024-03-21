import {StyleSheet, Text, Pressable, Platform} from 'react-native';
import Colors from '../constants/Colors';
import GeneralMaterialIcons from './GeneralMaterialIcons';
import PlusJakartaSansText from '../../../fonts/PlusJakartaSansText';
import PoppinsText from '../../../fonts/PoppinsText';

function GeneralRefreshButton({onPress, textStyle, color, size}) {
  return (
    <Pressable
      style={({pressed}) => [
        styles.refreshContainer,
        pressed && styles.pressed,
      ]}
      onPress={onPress}>
      <GeneralMaterialIcons
        name="refresh"
        size={size ? size : 28}
        color={color ? color : 'black'}
      />
      <PoppinsText
        weight="Bold"
        style={[styles.pressableText, textStyle, color && {color: color}]}>
        Refresh Page
      </PoppinsText>
    </Pressable>
  );
}

export default GeneralRefreshButton;

const styles = StyleSheet.create({
  refreshContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  pressed: {
    opacity: 0.7,
  },
  pressableText: {
    fontSize: 16,
    color: 'black',
    marginHorizontal: 4,
    marginBottom: Platform.OS === 'ios' ? 0 : -4,
    //textDecorationLine: "underline",
  },
});
