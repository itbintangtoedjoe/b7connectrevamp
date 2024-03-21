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
import {useFocusEffect} from '@react-navigation/native';

import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import * as GeneralComponents from '../components/GeneralComponents';
import {
  Authentication,
  AuthenticationEO,
  saveUserToken,
} from '../utils/APIMethods';
import {CheckSignInForm, NetworkErrorHandler} from '../utils/HelperMethods';
import {AuthContext} from '../context/auth-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PlusJakartaSansText from '../../../fonts/PlusJakartaSansText';
import PoppinsText from '../../../fonts/PoppinsText';
import Strings from '../constants/Strings';

function AuthenticationScreen({navigation}) {
  const authCtx = React.useContext(AuthContext);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isAuthenticating, setIsAuthenticating] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');

      Platform.OS === 'android'
        ? StatusBar.setBackgroundColor('white')
        : undefined;
    }, []),
  );

  function passwordVisibilityHandler() {
    if (isPasswordVisible) {
      setIsPasswordVisible(false);
    } else if (!isPasswordVisible) {
      setIsPasswordVisible(true);
    }
  }

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'email':
        setEmail(enteredValue);
        break;
      case 'password':
        setPassword(enteredValue);
        break;
    }
  }

  async function signInHandler() {
    setIsAuthenticating(true);
    const checkValidity = await CheckSignInForm(email, password);
    if (checkValidity === 'Valid') {
      try {
        const response = await Authentication(email, password);
        console.log(response.Message);
        if (response.Status === false) {
          setIsAuthenticating(false);
          if (response.Message == 'not active') {
            Alert.alert(
              'Authentication failed',
              'Your account is inactive. Please contact the IT support team.',
            );
          } else {
            Alert.alert(
              'Authentication failed',
              "Your email or password doesn't match",
            );
          }
          return;
        } else if (response.Status === true) {
          const responseEO = await AuthenticationEO(response);
          // console.log(response.Data.NIK, authCtx.deviceToken);
          // const responseToken = await saveUserToken(
          //   response.NIK,
          //   authCtx.deviceToken,
          // );
          // console.log(responseToken);
          AsyncStorage.setItem('email', email.toString());
          AsyncStorage.setItem('password', password.toString());
          authCtx.Authenticate(response);
          authCtx.AuthenticateEO(responseEO);

          const nextTimeCheckOTP = await AsyncStorage.getItem(
            'nextTimeCheckOTP',
          );
          // console.log('email.trim(): ', email.trim());
          // console.log('Strings.emailDemo: ', Strings.emailDemo);
          if (
            email.trim() === Strings.emailDemo
            // ||
            // email.trim() === 'feliciabrilliantb@gmail.com' ||
            // email.trim() === 'dennyirawan9@gmail.com'
          ) {
            navigation.replace('Authenticated');
            navigation.reset({index: 0, routes: [{name: 'Authenticated'}]});
          } else {
            if (
              nextTimeCheckOTP == null ||
              new Date(nextTimeCheckOTP) >= new Date()
            ) {
              // AsyncStorage.setItem('otpAttemptsLeft', '3');
              // console.log('mashok haruse');
              navigation.replace('Authenticated', {
                screen: 'OTP',
                params: {
                  email: email,
                },
              });
              // navigation.reset({index: 0, routes: [{name: 'Authenticated'}]});
            } else {
              if (password === 'b7c#default') {
                navigation.replace('Authenticated', {
                  screen: 'ChangePassword',
                  // screen: 'OTP', //ganti di sini gantiiii
                  params: {
                    email: email,
                  },
                });
                // navigation.replace('Authenticated', {
                //   screen: 'ChangePassword',
                //   params: {
                //     password: password,
                //   },
                // });
                navigation.reset({index: 0, routes: [{name: 'Authenticated'}]});
              } else {
                navigation.replace('Authenticated');
                navigation.reset({index: 0, routes: [{name: 'Authenticated'}]});
              }
            }
          }
        } else {
          setIsAuthenticating(false);
          Alert.alert('Something went wrong!', 'Please try again');
          return;
        }
      } catch (err) {
        NetworkErrorHandler(err);
      }
    } else {
      setIsAuthenticating(false);
      Alert.alert('Authentication failed', 'Please fill the form correctly');
      return;
    }

    setIsAuthenticating(false);
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={styles.rootContainer}>
        {/* <KeyboardAvoidingView style={styles.rootContainer} behavior="height"> */}
        <GeneralComponents.Background>
          <View style={styles.titleContainer}>
            <PoppinsText weight="Bold" style={styles.titleText}>
              B7 Connect
            </PoppinsText>
            <PoppinsText style={styles.welcomeText}>Welcome back.</PoppinsText>
          </View>
          <View style={styles.bodyContainer}>
            <View style={styles.formContainer}>
              <GeneralComponents.FormInput
                containerStyle={{marginBottom: 8}}
                placeholder="Email"
                onUpdateValue={updateInputValueHandler.bind(this, 'email')}
                textInputConfig={{value: email}}
              />
              <GeneralComponents.SecureInput
                containerStyle={{marginBottom: 16}}
                placeholder="Password"
                onUpdateValue={updateInputValueHandler.bind(this, 'password')}
                textInputConfig={{value: password}}
              />
            </View>
            <View style={styles.forgotToggleContainer}>
              <GeneralComponents.PressableText
                onPress={() => navigation.navigate('ForgotPassword')}
                textStyle={{
                  textDecorationLine: 'underline',
                  marginBottom: Platform.OS === 'ios' ? 0 : -4,
                }}>
                Forgot password?
              </GeneralComponents.PressableText>
              {/* <GeneralComponents.PasswordToggle
                onChange={passwordVisibilityHandler}
              /> */}
            </View>
            {!isAuthenticating && (
              <GeneralComponents.Button onPress={signInHandler}>
                Sign in
              </GeneralComponents.Button>
            )}
            {isAuthenticating && (
              <GeneralComponents.LoadingButton title="Signing in..." />
            )}
            {/* <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'center',
                  marginTop: 6,
                }}>
                <PoppinsText weight="Medium" style={styles.createAccountText}>
                  Don't have an account?{' '}
                </PoppinsText>
                <GeneralComponents.PressableText
                  onPress={() => navigation.navigate('RegisterScreen')}
                  textWeight="Medium"
                  textStyle={[
                    styles.createAccountText,
                    {
                      textDecorationLine: 'underline',
                      color: Colors.primaryColor,
                    },
                  ]}>
                  Create an account!
                </GeneralComponents.PressableText>
              </View> */}
          </View>
          <GeneralComponents.Copyright />
        </GeneralComponents.Background>
        {/* </KeyboardAvoidingView> */}
      </SafeAreaView>
    </>
  );
}

export default AuthenticationScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleContainer: {
    marginBottom: 12,
    alignItems: 'center',
  },
  titleText: {
    color: Colors.primaryColor,
    fontSize: 36,
    marginBottom: Platform.OS === 'ios' ? 0 : -12,
  },
  welcomeText: {
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
  },
  forgotToggleContainer: {
    //borderWidth: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  createAccountText: {
    fontSize: 12,
    color: 'black',
  },
});
