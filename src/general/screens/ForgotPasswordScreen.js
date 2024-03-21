import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {useFocusEffect} from '@react-navigation/native';

import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import * as GeneralComponents from '../components/GeneralComponents';
import {ForgotPassword} from '../utils/APIMethods';
import {CheckEmail, NetworkErrorHandler} from '../utils/HelperMethods';
import PlusJakartaSansText from '../../../fonts/PlusJakartaSansText';
import PoppinsText from '../../../fonts/PoppinsText';

function ForgotPasswordScreen({navigation}) {
  const [email, setEmail] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');

      Platform.OS === 'android'
        ? StatusBar.setBackgroundColor('white')
        : undefined;
    }, []),
  );

  function backToAuthenticationHandler() {
    navigation.navigate('Authentication');
  }

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'email':
        setEmail(enteredValue);
        break;
      default:
        break;
    }
  }

  function toastHandler() {
    Toast.show({
      type: 'b7toast',
      text1: 'Success',
      text2: 'A request has been sent to your email',
      position: 'bottom',
      props: {bgColor: Colors.CAMGreen},
    });
  }

  async function forgotPasswordHandler() {
    setIsLoading(true);

    const checkEmail = await CheckEmail(email);
    if (checkEmail) {
      setIsLoading(false);
      Alert.alert('Authentication failed', checkEmail);
      return;
    }

    try {
      const response = await ForgotPassword(email);
      if (response === 'success') {
        toastHandler();
        backToAuthenticationHandler();
      } else if (response === 'not found') {
        Alert.alert('Authentication failed', 'Email is not registered');
      } else {
        Alert.alert('Something went wrong!', response);
      }
    } catch (err) {
      NetworkErrorHandler(err);
    }

    setIsLoading(false);
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={styles.rootContainer}>
        <KeyboardAvoidingView style={styles.rootContainer} behavior="height">
          <GeneralComponents.Background>
            <View style={styles.titleContainer}>
              <PoppinsText weight="Bold" style={styles.titleText}>
                B7 Connect
              </PoppinsText>
              <PoppinsText style={styles.forgotPasswordText}>
                Forgot your password?
              </PoppinsText>
            </View>
            <View style={styles.bodyContainer}>
              <View style={styles.formContainer}>
                <GeneralComponents.FormInput
                  containerStyle={{marginBottom: 12}}
                  placeholder="Email"
                  onUpdateValue={updateInputValueHandler.bind(this, 'email')}
                />
              </View>
              {!isLoading && (
                <GeneralComponents.Button onPress={forgotPasswordHandler}>
                  Send request to email
                </GeneralComponents.Button>
              )}
              {isLoading && (
                <GeneralComponents.LoadingButton title="Sending Request..." />
              )}
              <GeneralComponents.ButtonOutline
                onPress={backToAuthenticationHandler}>
                Back to sign in
              </GeneralComponents.ButtonOutline>
              {/* <GeneralComponents.ButtonOutline onPress={toastHandler}>
              toast
            </GeneralComponents.ButtonOutline> */}
            </View>
          </GeneralComponents.Background>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  titleText: {
    color: Colors.primaryColor,
    fontSize: 36,
    marginBottom: Platform.OS === 'ios' ? 0 : -12,
  },
  forgotPasswordText: {
    color: Colors.primaryColor,
    fontSize: 16,
    marginBottom: Platform.OS === 'ios' ? 0 : -8,
  },
  bodyContainer: {
    //borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
    width: '80%',
  },
  formContainer: {
    width: '100%',
    marginBottom: 12,
  },
});
