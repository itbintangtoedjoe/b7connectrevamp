import {Pressable, View, Text, StyleSheet, Platform} from 'react-native';

import Colors from '../../../general/constants/Colors';
import Styles from '../../../general/constants/Styles';
import GeneralIonicons from '../../../general/components/GeneralIonicons';
import GeneralMaterialIcons from '../../../general/components/GeneralMaterialIcons';
import PlusJakartaSansText from '../../../../fonts/PlusJakartaSansText';
import PoppinsText from '../../../../fonts/PoppinsText';

function CAMModalButton({
  materialicon,
  onPress,
  title,
  iconName,
  iconSize,
  iconColor,
  containerStyle,
  textStyle,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.modalButtonContainer,
        pressed && Styles.pressed,
        containerStyle,
      ]}>
      {!materialicon && (
        <GeneralIonicons
          name={iconName ? iconName : 'checkmark'}
          size={iconSize ? iconSize : 18}
          color={iconColor ? iconColor : Colors.primaryColor50}
        />
      )}
      {materialicon && (
        <GeneralMaterialIcons
          name={iconName ? iconName : 'check'}
          size={iconSize ? iconSize : 18}
          color={iconColor ? iconColor : Colors.primaryColor50}
        />
      )}
      <PoppinsText weight="Bold" style={[styles.modalButtonText, textStyle]}>
        {title ? title : 'Title'}
      </PoppinsText>
    </Pressable>
  );
}

export default CAMModalButton;

const styles = StyleSheet.create({
  modalButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  modalButtonText: {
    marginBottom: Platform.OS === 'ios' ? 0 : -3,
    marginLeft: 2,
    fontSize: 13,
    color: Colors.primaryColor50,
  },
});
