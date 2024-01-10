import {StyleSheet, Text, View, Pressable} from 'react-native';

import Colors from '../constants/Colors';

function GeneralButtonOutline({onPress, buttonStyle, textStyle, children}) {
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
    fontWeight: 'bold',
    color: Colors.primaryColor,
    fontSize: 16,
  },
});
