import {StyleSheet, Text, View, Pressable} from 'react-native';

import Colors from '../constants/Colors';

function GeneralButton({onPress, buttonStyle, textStyle, children}) {
  return (
    <Pressable
      style={({pressed}) => [
        styles.buttonContainer,
        pressed && styles.pressed,
        buttonStyle,
      ]}
      onPress={onPress}>
      <View>
        <Text style={[styles.buttonText, textStyle]}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default GeneralButton;

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    height: 40,
    backgroundColor: Colors.primaryColor,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
});
