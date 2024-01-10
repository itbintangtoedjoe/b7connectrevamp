import {Pressable, View, Text, StyleSheet} from 'react-native';

import Colors from '../../../general/constants/Colors';
import Styles from '../../../general/constants/Styles';
import GeneralIonicons from '../../../general/components/GeneralIonicons';

function CAMModalButton({
  onPress,
  title,
  iconName,
  iconSize,
  iconColor,
  containerStyle,
  textStyle,
  fill,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.modalButtonContainer,
        pressed && Styles.pressed,
        fill && {backgroundColor: Colors.primaryColor},
        containerStyle,
      ]}>
      <GeneralIonicons
        name={iconName ? iconName : 'checkmark'}
        size={iconSize ? iconSize : 18}
        color={iconColor ? iconColor : Colors.primaryColor}
      />
      <Text
        style={[styles.modalButtonText, fill && {color: 'white'}, textStyle]}>
        {title ? title : 'Title'}
      </Text>
      {/* <GeneralIonicons
        name={iconName ? iconName : 'checkmark'}
        size={iconSize ? iconSize : 18}
        color="transparent"
      /> */}
    </Pressable>
  );
}

export default CAMModalButton;

const styles = StyleSheet.create({
  modalButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.primaryColor,
    backgroundColor: 'white',
  },
  modalButtonText: {
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 4,
    color: Colors.primaryColor,
  },
});
