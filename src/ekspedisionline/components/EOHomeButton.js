import {View, Text, StyleSheet, Pressable, Platform} from 'react-native';

import Colors from '../../general/constants/Colors';
import Styles from '../../general/constants/Styles';
import GeneralIonicons from '../../general/components/GeneralIonicons';
import GeneralMaterialIcons from '../../general/components/GeneralMaterialIcons';
import MontserratText from '../../../fonts/MontserratText';
import PlusJakartaSansText from '../../../fonts/PlusJakartaSansText';
import PoppinsText from '../../../fonts/PoppinsText';

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
      <GeneralMaterialIcons
        name={name ? name : 'account-circle'}
        size={size ? size : 24}
        color={outline ? Colors.EOPrimary : 'white'}
      />
      <PoppinsText
        weight="Bold"
        style={[
          styles.buttonText,
          outline && {color: Colors.EOPrimary},
          textStyle,
        ]}>
        {title ? title : 'Title'}
      </PoppinsText>
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
    backgroundColor: Colors.EOPrimary,
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
    borderColor: Colors.EOPrimary,
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    marginLeft: 12,
    marginBottom: Platform.OS === 'ios' ? 0 : -4,
  },
});
