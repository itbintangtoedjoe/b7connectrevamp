import {View, Text, StyleSheet, Pressable} from 'react-native';

import Colors from '../../general/constants/Colors';
import Styles from '../../general/constants/Styles';
import GeneralIonicons from '../../general/components/GeneralIonicons';
import GeneralMaterialIcons from '../../general/components/GeneralMaterialIcons';

function EOHomeButton({
  title,
  onPress,
  name,
  size,
  color,
  outline,
  materialIcon,
  ionicon,
  containerStyle,
  textStyle,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        !outline && styles.buttonContainer,
        outline && styles.buttonContainerOutline,
        containerStyle,
        pressed && Styles.pressed,
      ]}>
      {ionicon && (
        <GeneralIonicons
          name={name ? name : 'person-circle'}
          size={size ? size : 24}
          color={color ? color : 'white'}
        />
      )}
      {materialIcon && (
        <GeneralMaterialIcons
          name={name ? name : 'account-circle'}
          size={size ? size : 24}
          color={color ? color : 'white'}
        />
      )}
      <Text style={[styles.buttonText, textStyle]}>
        {title ? title : 'Title'}
      </Text>
    </Pressable>
  );
}

export default EOHomeButton;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    padding: 12,
    borderRadius: 12,
    backgroundColor: Colors.primaryColor,
  },
  buttonContainerOutline: {
    flexDirection: 'row',
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.primaryColor,
    backgroundColor: 'white',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white',
    marginLeft: 12,
  },
});
