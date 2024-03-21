import React, {useRef, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  BackHandler,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {useFocusEffect} from '@react-navigation/native';

import OTPTextView from 'react-native-otp-textinput';
import Clipboard from '@react-native-clipboard/clipboard';

import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import * as GeneralComponents from '../components/GeneralComponents';
import {AuthContext} from '../../general/context/auth-context';
import {
  CheckConfirmPassword,
  CheckNewPassword,
  NetworkErrorHandler,
} from '../utils/HelperMethods';
import {Authentication, RequestOTP, VerifyOTP} from '../utils/APIMethods';
import PlusJakartaSansText from '../../../fonts/PlusJakartaSansText';
import PoppinsText from '../../../fonts/PoppinsText';

function OTPScreen({navigation}) {
  const authCtx = React.useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmNewPassword, setConfirmNewPassword] = React.useState('');
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [defaultPass, setDefaultPass] = React.useState(false);

  //otp
  const [otpInput, setOtpInput] = useState('');
  const [otpFromServer, setOtpFromServer] = useState('');
  const inputOTP = useRef();
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(59);

  const clear = () => input.current?.clear();
  const updateOtpText = () => input.current?.setValue(otpInput);
  const showTextAlert = () => otpInput && Alert.alert(otpInput);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');

      Platform.OS === 'android'
        ? StatusBar.setBackgroundColor('white')
        : undefined;
    }, []),
  );

  React.useEffect(() => {
    sendRequestOTP();
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const resendOTPHandler = () => {
    setMinutes(0);
    setSeconds(59);
    sendRequestOTP();
  };

  async function sendRequestOTP() {
    // console.log('req');
    try {
      const response = await RequestOTP(authCtx.Email);
      // console.log(response);
      setOtpFromServer(response.Data);
      if (response.Message === 'success') {
        toastHandler('OTP Sent', 'Please check your email');
      } else {
        toastHandler('Failed sending the OTP', 'Please try again');
      }
    } catch (err) {
      NetworkErrorHandler(err);
    }
  }

  function toastHandler(title, body) {
    Toast.show({
      type: 'b7toast',
      text1: title,
      text2: body,
      position: 'bottom',
      props: {bgColor: Colors.primaryColor},
    });
  }

  async function verifyOtpHandler() {
    if (otpInput.length == 6) {
      setIsVerifying(true);
      try {
        const response = await VerifyOTP(authCtx.Email, otpInput);
        if (response.Status === 'success') {
          await AsyncStorage.setItem('otpLocalStatus', 'valid');
          const expDateBefore = new Date();
          const expDateAfter = expDateBefore.setMonth(
            expDateBefore.getMonth() + 1,
          );
          const expDate = new Date(expDateAfter).toISOString();

          await AsyncStorage.setItem('nextTimeCheckOTP', expDate.toString());

          navigation.replace('Home');
          navigation.reset({index: 0, routes: [{name: 'Home'}]});

          toastHandler('Success', 'Login successful');
        } else if (response.Status === 'failed') {
          let attemptsLeft = response.Message;

          if (attemptsLeft > 1) {
            Alert.alert(
              'Incorrect OTP Entered',
              'Please make sure the OTP is correct and try again. ' +
                attemptsLeft +
                ' attempts left.',
            );
          } else if (attemptsLeft == 1) {
            Alert.alert(
              'Incorrect OTP Entered',
              'Please make sure the OTP is correct and try again. You have one more attempt before your account is locked.',
            );
          } else {
            Alert.alert(
              'Account Locked',
              'Your account is locked for exceeding OTP attempts. Please contact the IT support team to unlock.',
            );
            authCtx.SignOut();
            navigation.replace('NotAuthenticated');
            navigation.reset({
              index: 0,
              routes: [{name: 'NotAuthenticated'}],
            });
          }
        } else {
          toastHandler('Error', 'Please try again');
          authCtx.SignOut();
          navigation.replace('NotAuthenticated');
          navigation.reset({
            index: 0,
            routes: [{name: 'NotAuthenticated'}],
          });
        }
      } catch (err) {
        NetworkErrorHandler(err);
      }
      setIsVerifying(false);
    }
  }

  // async function verifyOtpHandler() {
  //   setIsVerifying(true);
  //   try {
  //     //code here
  //     if (otpInput.trim().toString() === otpFromServer.toString()) {
  //       const expDateBefore = new Date();
  //       const expDateAfter = expDateBefore.setMonth(
  //         expDateBefore.getMonth() + 1,
  //       );
  //       const expDate = new Date(expDateAfter).toISOString();
  //       // console.log(expDate);
  //       AsyncStorage.setItem('otpLocalStatus', 'valid');
  //       await AsyncStorage.setItem('nextTimeCheckOTP', expDate);
  //       navigation.replace('Home');
  //       navigation.reset({index: 0, routes: [{name: 'Home'}]});
  //       toastHandler('Success', 'Login successful');
  //     } else {
  //       AsyncStorage.setItem('otpLocalStatus', 'invalid');
  //       let attemptsLeft = await AsyncStorage.getItem('otpAttemptsLeft');
  //       attemptsLeft = parseInt(attemptsLeft);
  //       if (attemptsLeft > 0) {
  //         attemptsLeft--;
  //         await AsyncStorage.setItem(
  //           'otpAttemptsLeft',
  //           attemptsLeft.toString(),
  //         );
  //         toastHandler(
  //           'Incorrect OTP Entered',
  //           'Please make sure the OTP is correct and try again. ' +
  //             attemptsLeft +
  //             ' attempt(s) left.',
  //         );
  //       } else {
  //         console.log('habis gan');
  //         Alert.alert(
  //           'Account Locked',
  //           'Your account is locked for exceeding OTP attempts. Please contact the IT support team to unlock.',
  //         );
  //       }
  //       setOtpInput('');
  //     }
  //   } catch (err) {
  //     NetworkErrorHandler(err);
  //   }
  //   setIsVerifying(false);
  // }

  const handleCellTextChange = async (text, i) => {
    if (i === 0) {
      const clippedText = await Clipboard.getString();
      if (clippedText.slice(0, 1) === text) {
        input.current?.setValue(clippedText, true);
      }
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={styles.rootContainer}>
        <KeyboardAvoidingView style={styles.rootContainer} behavior="height">
          <GeneralComponents.Background>
            <View style={styles.textContainer}>
              <PoppinsText weight="Bold" style={styles.titleText}>
                OTP Verification
              </PoppinsText>
              <PoppinsText weight="Medium" style={styles.descText}>
                {'One Time Password (OTP) has been sent to ' +
                  authCtx.Email +
                  ' '}
                <PoppinsText
                  weight="Medium"
                  style={styles.clickableText}
                  onPress={() => {
                    authCtx.SignOut();
                    navigation.replace('NotAuthenticated');
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'NotAuthenticated'}],
                    });
                  }}>
                  (not you?)
                </PoppinsText>
              </PoppinsText>
            </View>
            <View style={styles.bodyContainer}>
              <View style={styles.formContainer}>
                <OTPTextView
                  ref={inputOTP}
                  handleTextChange={setOtpInput}
                  handleCellTextChange={handleCellTextChange}
                  containerStyle={styles.textInputContainer}
                  textInputStyle={styles.roundedTextInput}
                  inputCount={6}
                  inputCellLength={1}
                  tintColor={Colors.primaryColor}
                  offTintColor={Colors.primaryGray}
                />
              </View>
              {!isVerifying && (
                <GeneralComponents.Button
                  buttonStyle={{
                    backgroundColor:
                      otpInput.length < 6
                        ? Colors.primaryGray
                        : Colors.primaryColor,
                  }}
                  onPress={defaultPass ? verifyOtpHandler : verifyOtpHandler}>
                  Verify
                </GeneralComponents.Button>
              )}
              {isVerifying && (
                <GeneralComponents.LoadingButton title="Verifying..." />
              )}
            </View>
            <View style={styles.textContainer}>
              <PoppinsText weight="Medium" style={styles.resendOTPText}>
                Didn't receive the OTP?
                {seconds > 0 || minutes > 0 ? (
                  <PoppinsText weight="Medium" style={styles.resendOTPText}>
                    {' '}
                    Resend OTP in {minutes < 10 ? `0${minutes}` : minutes}:
                    {seconds < 10 ? `0${seconds}` : seconds}
                  </PoppinsText>
                ) : (
                  <PoppinsText
                    weight="Medium"
                    style={styles.clickableText}
                    onPress={resendOTPHandler}>
                    {' '}
                    Resend OTP
                  </PoppinsText>
                )}
                {/* <PoppinsText
                  weight="Medium"
                  style={styles.clickableText}
                  onPress={resendOTPHandler}>
                  yew
                </PoppinsText> */}
              </PoppinsText>
            </View>
          </GeneralComponents.Background>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

export default OTPScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  textContainer: {
    alignItems: 'center',
    marginHorizontal: '1%',
  },
  titleText: {
    color: Colors.primaryColor,
    fontSize: 28,
    marginBottom: Platform.OS === 'ios' ? 0 : -12,
  },
  descText: {
    color: Colors.primaryGray,
    textAlign: 'center',
    marginTop: '1%',
  },
  clickableText: {
    // textDecorationLine: 'underline',
    color: Colors.primaryColor,
    fontSize: 12,
  },
  resendOTPText: {
    color: Colors.primaryGray,
    textAlign: 'center',
    marginTop: '1%',
    fontSize: 12,
  },
  bodyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
    width: '80%',
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '10%',
  },
  toggleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 16,
  },
  textInputContainer: {
    marginBottom: 20,
    color: Colors.primaryColor,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 4,
  },
});
