import React from 'react';
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

import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import * as GeneralComponents from '../components/GeneralComponents';
import {AuthContext} from '../../general/context/auth-context';
import {
  CheckConfirmPassword,
  CheckNewPassword,
  NetworkErrorHandler,
} from '../utils/HelperMethods';
import {Authentication, ChangePassword} from '../utils/APIMethods';
import PlusJakartaSansText from '../../../fonts/PlusJakartaSansText';
import PoppinsText from '../../../fonts/PoppinsText';

function ChangePasswordScreen({navigation}) {
  const authCtx = React.useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmNewPassword, setConfirmNewPassword] = React.useState('');
  const [isSaving, setIsSaving] = React.useState(false);
  const [defaultPass, setDefaultPass] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');

      Platform.OS === 'android'
        ? StatusBar.setBackgroundColor('white')
        : undefined;
    }, []),
  );

  React.useEffect(() => {
    async function checkDefaultPass() {
      const storedPassword = await AsyncStorage.getItem('password');
      if (storedPassword === 'b7c#default') {
        setDefaultPass(true);
      }
    }
    checkDefaultPass();
  }, []);

  /* React.useEffect(() => {
    async function disableBack() {
      const storedPassword = await AsyncStorage.getItem("password");
      if (storedPassword !== "b7c#default") return;
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => true
      );
      return () => backHandler.remove();
    }
    disableBack();
  }, []); */

  function toastHandler() {
    Toast.show({
      type: 'b7toast',
      text1: 'Success',
      text2: 'Successfully changed your password',
      position: 'bottom',
      props: {bgColor: Colors.CAMGreen},
    });
  }

  async function saveNewPasswordHandler() {
    setIsSaving(true);
    const currentPasswordCheck = await Authentication(
      authCtx.Email,
      currentPassword,
    );
    const newPasswordCheck = CheckNewPassword(newPassword);
    const confirmPasswordCheck = CheckConfirmPassword(
      newPassword,
      confirmNewPassword,
    );

    if (
      currentPasswordCheck.Status === false ||
      currentPassword === 'zuppass.'
    ) {
      setIsSaving(false);
      Alert.alert('Failed', "Your current password doesn't match");
      return;
    } else {
      if (newPasswordCheck) {
        setIsSaving(false);
        Alert.alert('Failed', newPasswordCheck);
        return;
      } else {
        if (confirmPasswordCheck) {
          setIsSaving(false);
          Alert.alert('Failed', confirmPasswordCheck);
          return;
        } else {
          try {
            const response = await ChangePassword(authCtx.NIK, newPassword);
            if (response === 'success') {
              toastHandler();
            }
            if (currentPassword === 'b7c#default') {
              await AsyncStorage.setItem('password', newPassword.toString());
              navigation.replace('Home');
              navigation.reset({index: 0, routes: [{name: 'Home'}]});
            } else {
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
        }
      }
    }
    setIsSaving(false);
  }

  function changeAccountHandler() {
    authCtx.SignOut();
    navigation.navigate('NotAuthenticated');
  }

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'current':
        setCurrentPassword(enteredValue);
        break;
      case 'new':
        setNewPassword(enteredValue);
        break;
      case 'confirm':
        setConfirmNewPassword(enteredValue);
        break;
      default:
        break;
    }
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={styles.rootContainer}>
        <KeyboardAvoidingView style={styles.rootContainer} behavior="height">
          <GeneralComponents.Background>
            <View style={styles.titleContainer}>
              <PoppinsText weight="Bold" style={styles.titleText}>
                Change Password
              </PoppinsText>
              {defaultPass && (
                <PoppinsText weight="Medium" style={styles.changeText}>
                  {'Please change your password\nbefore continuing'}
                </PoppinsText>
              )}
            </View>
            <View style={styles.bodyContainer}>
              <View style={styles.formContainer}>
                <GeneralComponents.FormInput
                  containerStyle={{marginBottom: 16}}
                  formStyle={{
                    backgroundColor: Colors.primaryColor100,
                    color: Colors.primaryColor,
                    fontWeight: 'bold',
                    marginVertical: 0,
                  }}
                  textInputConfig={{
                    value: authCtx.Email,
                    editable: false,
                  }}
                />
                <GeneralComponents.SecureInput
                  color={Colors.primaryColor}
                  containerStyle={{marginBottom: 16}}
                  placeholder="Current Password..."
                  onUpdateValue={updateInputValueHandler.bind(this, 'current')}
                />
                <GeneralComponents.SecureInput
                  color={Colors.primaryColor}
                  containerStyle={{marginBottom: 16}}
                  placeholder="New Password..."
                  onUpdateValue={updateInputValueHandler.bind(this, 'new')}
                />
                <GeneralComponents.SecureInput
                  color={Colors.primaryColor}
                  containerStyle={{marginBottom: 16}}
                  placeholder="Confirm New Password..."
                  onUpdateValue={updateInputValueHandler.bind(this, 'confirm')}
                />
              </View>
              {!isSaving && (
                <GeneralComponents.Button
                  onPress={
                    defaultPass
                      ? saveNewPasswordHandler
                      : saveNewPasswordHandler
                  }>
                  Save new password
                </GeneralComponents.Button>
              )}
              {isSaving && (
                <GeneralComponents.LoadingButton title="Saving new password..." />
              )}
              {!defaultPass && (
                <GeneralComponents.ButtonOutline
                  onPress={() => navigation.pop()}>
                  Cancel
                </GeneralComponents.ButtonOutline>
              )}
            </View>
          </GeneralComponents.Background>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleContainer: {
    alignItems: 'center',
  },
  titleText: {
    color: Colors.primaryColor,
    fontSize: 28,
    marginBottom: Platform.OS === 'ios' ? 0 : -12,
  },
  changeText: {
    color: Colors.redAccent,
    textAlign: 'center',
    marginTop: 8,
  },
  bodyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
    width: '80%',
  },
  formContainer: {
    width: '100%',
  },
  toggleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 16,
  },
});
