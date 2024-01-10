import React from 'react';
import {StatusBar, StyleSheet, Text, View, SafeAreaView} from 'react-native';

import Colors from '../constants/Colors';
import * as GeneralComponents from '../components/GeneralComponents';

function ForgotPasswordScreen({navigation}) {
  function backToAuthenticationHandler() {
    navigation.navigate('Authentication');
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={styles.rootContainer}>
        <GeneralComponents.Background>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>B7 Connect</Text>
            <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
          </View>
          <View style={styles.bodyContainer}>
            <View style={styles.formContainer}>
              <GeneralComponents.FormInput
                containerStyle={{marginBottom: 12}}
                placeholder="Email"
              />
            </View>
            <GeneralComponents.Button onPress={backToAuthenticationHandler}>
              Send request to Email
            </GeneralComponents.Button>
            <GeneralComponents.ButtonOutline
              onPress={backToAuthenticationHandler}>
              Back to Sign In
            </GeneralComponents.ButtonOutline>
          </View>
        </GeneralComponents.Background>
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
    fontWeight: 'bold',
    fontSize: 36,
  },
  forgotPasswordText: {
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
    marginBottom: 12,
  },
});
