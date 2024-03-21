import React from 'react';
import {Platform, StyleSheet, TextInput, View} from 'react-native';

import Colors from '../constants/Colors';
import GeneralPressableIcon from './GeneralPressableIonicons';
import PlusJakartaSansText from '../../../fonts/PlusJakartaSansText';

function GeneralSecureInput({
  placeholder,
  containerStyle,
  formStyle,
  textInputConfig,
  secure,
  onUpdateValue,
  color,
}) {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  function passwordVisibilityHandler() {
    if (isPasswordVisible) {
      setIsPasswordVisible(false);
    } else if (!isPasswordVisible) {
      setIsPasswordVisible(true);
    }
  }

  return (
    <View style={[styles.form, containerStyle]}>
      <TextInput
        style={[styles.formContainer, formStyle]}
        placeholder={placeholder}
        secureTextEntry={!isPasswordVisible}
        cursorColor={color ? color : Colors.primaryColor}
        selectionColor={'lightgrey'}
        textAlignVertical="center"
        onChangeText={onUpdateValue}
        autoCapitalize="none"
        {...textInputConfig}
      />
      <View style={styles.toggleIcon}>
        <GeneralPressableIcon
          onPress={passwordVisibilityHandler}
          name={!isPasswordVisible ? 'eye-off' : 'eye'}
        />
      </View>
    </View>
  );
}

export default GeneralSecureInput;

const styles = StyleSheet.create({
  form: {
    flexDirection: 'row',
    width: '100%',
    height: Platform.OS === 'ios' ? 50 : 'undefined',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.primaryColor,
    marginVertical: 4,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 12,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  toggleIcon: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
