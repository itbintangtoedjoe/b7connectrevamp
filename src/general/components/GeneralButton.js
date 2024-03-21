import {StyleSheet, Text, View, Pressable, Platform} from 'react-native';

import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import GeneralMaterialIcons from './GeneralMaterialIcons';
import PlusJakartaSansText from '../../../fonts/PlusJakartaSansText';
import PoppinsText from '../../../fonts/PoppinsText';

function GeneralButton({
  onPress,
  buttonStyle,
  textStyle,
  children,
  shadow,
  icon,
  iconColor,
  iconSize,
  unpressable,
}) {
  return (
    <Pressable
      style={({pressed}) => [
        styles.buttonContainer,
        shadow && Styles.shadow,
        !unpressable && pressed && Styles.pressed,
        buttonStyle,
      ]}
      onPress={onPress}>
      {icon && (
        <GeneralMaterialIcons
          name={icon}
          color={iconColor ? iconColor : 'white'}
          size={iconSize ? iconSize : 20}
        />
      )}
      <PoppinsText
        weight="SemiBold"
        style={[styles.buttonText, textStyle, icon && {marginHorizontal: 4}]}>
        {children}
      </PoppinsText>
    </Pressable>
  );
}

export default GeneralButton;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 40,
    backgroundColor: Colors.primaryColor,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginBottom: Platform.OS === 'ios' ? 0 : -4,
  },
  loadingText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    marginLeft: 8,
  },
});
