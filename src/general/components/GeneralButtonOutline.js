import {StyleSheet, Text, View, Pressable, Platform} from 'react-native';

import Colors from '../constants/Colors';
import PlusJakartaSansText from '../../../fonts/PlusJakartaSansText';
import PoppinsText from '../../../fonts/PoppinsText';

function GeneralButtonOutline({onPress, buttonStyle, textStyle, children}) {
  return (
    <Pressable
      style={({pressed}) => [
        styles.buttonContainer,
        pressed && styles.pressed,
        buttonStyle,
      ]}
      onPress={onPress}>
      <PoppinsText weight="SemiBold" style={[styles.buttonText, textStyle]}>
        {children}
      </PoppinsText>
    </Pressable>
  );
}

export default GeneralButtonOutline;

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: Colors.primaryColor,
    fontSize: 16,
    marginBottom: Platform.OS === 'ios' ? 0 : -4,
  },
});
