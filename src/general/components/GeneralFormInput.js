import {Text, Platform, StyleSheet, TextInput, View} from 'react-native';

import Colors from '../constants/Colors';
import PlusJakartaSansText from '../../../fonts/PlusJakartaSansText';
import PoppinsText from '../../../fonts/PoppinsText';

function GeneralFormInput({
  placeholder,
  containerStyle,
  formStyle,
  textInputConfig,
  secure,
  onUpdateValue,
  color,
  label,
  labelStyle,
}) {
  return (
    <View style={containerStyle}>
      {label && (
        <PoppinsText
          weight="Bold"
          style={[styles.label, color && {color: color}, labelStyle]}>
          {label}
        </PoppinsText>
      )}
      <TextInput
        style={[styles.form, formStyle, color && {borderColor: color}]}
        placeholder={placeholder}
        secureTextEntry={secure}
        cursorColor={color ? color : Colors.primaryColor}
        selectionColor={'lightgrey'}
        textAlignVertical="center"
        onChangeText={onUpdateValue}
        autoCapitalize="none"
        {...textInputConfig}
      />
    </View>
  );
}

export default GeneralFormInput;

const styles = StyleSheet.create({
  form: {
    width: '100%',
    height: Platform.OS === 'ios' ? 50 : 'undefined',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.primaryColor,
    paddingHorizontal: 12,
    marginVertical: 4,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  label: {
    color: Colors.primaryColor,
    marginLeft: 4,
    marginBottom: Platform.OS === 'ios' ? 0 : -2,
  },
});
