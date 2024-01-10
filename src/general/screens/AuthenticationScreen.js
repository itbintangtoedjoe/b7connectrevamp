import React from 'react';
import {StatusBar, StyleSheet, Text, View, SafeAreaView} from 'react-native';

import Colors from '../constants/Colors';
import * as GeneralComponents from '../components/GeneralComponents';

function AuthenticationScreen({navigation}) {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  function passwordVisibilityHandler() {
    if (isPasswordVisible) {
      setIsPasswordVisible(false);
    } else if (!isPasswordVisible) {
      setIsPasswordVisible(true);
    }
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={styles.rootContainer}>
        <GeneralComponents.Background>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>B7 Connect</Text>
            <Text style={styles.welcomeText}>Welcome back.</Text>
          </View>
          <View style={styles.bodyContainer}>
            <View style={styles.formContainer}>
              <GeneralComponents.FormInput
                containerStyle={{marginBottom: 8}}
                placeholder="Email"
              />
              <GeneralComponents.FormInput
                containerStyle={{marginBottom: 8}}
                placeholder="Password"
                secure={!isPasswordVisible}
              />
            </View>
            <View style={styles.forgotToggleContainer}>
              <GeneralComponents.PressableText
                onPress={() => navigation.navigate('ForgotPassword')}
                textStyle={{textDecorationLine: 'underline'}}>
                Forgot Password?
              </GeneralComponents.PressableText>
              <GeneralComponents.PasswordToggle
                onChange={passwordVisibilityHandler}
              />
            </View>
            <GeneralComponents.Button
              onPress={() => navigation.replace('Authenticated')}>
              Sign In
            </GeneralComponents.Button>
          </View>
          <GeneralComponents.Copyright />
        </GeneralComponents.Background>
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
    fontWeight: 'bold',
    fontSize: 36,
  },
  welcomeText: {
    color: Colors.primaryColor,
    fontSize: 16,
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
});
