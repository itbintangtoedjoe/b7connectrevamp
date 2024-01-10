import {Platform, StyleSheet, TextInput, View} from 'react-native';

import Colors from '../constants/Colors';

function GeneralFormInput({
  placeholder,
  containerStyle,
  formStyle,
  textInputConfig,
  secure,
}) {
  return (
    <View style={containerStyle}>
      <TextInput
        style={[styles.form, formStyle]}
        placeholder={placeholder}
        secureTextEntry={secure}
        selectionColor={Colors.primaryColor}
        textAlignVertical="center"
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
  },
});
