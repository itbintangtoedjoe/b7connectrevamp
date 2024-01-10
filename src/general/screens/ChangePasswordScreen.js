import React from 'react';
import {StatusBar, StyleSheet, Text, View, SafeAreaView} from 'react-native';

import Colors from '../constants/Colors';
import * as GeneralComponents from '../components/GeneralComponents';

function ChangePasswordScreen({navigation}) {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  function passwordVisibilityHandler() {
    if (isPasswordVisible) {
      setIsPasswordVisible(false);
    } else if (!isPasswordVisible) {
      setIsPasswordVisible(true);
    }
  }

  async function savePasswordHandler() {
    navigation.pop();
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={styles.rootContainer}>
        <GeneralComponents.Background>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Change Password</Text>
          </View>
          <View style={styles.bodyContainer}>
            <View style={styles.formContainer}>
              <GeneralComponents.FormInput
                containerStyle={{marginBottom: 12}}
                placeholder="Current Password..."
                secure={!isPasswordVisible}
              />
              <GeneralComponents.FormInput
                containerStyle={{marginBottom: 12}}
                placeholder="New Password..."
                secure={!isPasswordVisible}
              />
              <GeneralComponents.FormInput
                containerStyle={{marginBottom: 12}}
                placeholder="Confirm New Password..."
                secure={!isPasswordVisible}
              />
            </View>
            <View style={styles.toggleContainer}>
              <GeneralComponents.PasswordToggle
                onChange={passwordVisibilityHandler}
              />
            </View>
            <GeneralComponents.Button onPress={savePasswordHandler}>
              Save New Password
            </GeneralComponents.Button>
            <GeneralComponents.ButtonOutline onPress={() => navigation.pop()}>
              Cancel
            </GeneralComponents.ButtonOutline>
          </View>
        </GeneralComponents.Background>
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
    marginBottom: 12,
  },
  titleText: {
    color: Colors.primaryColor,
    fontWeight: 'bold',
    fontSize: 32,
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
