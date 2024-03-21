import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';
import {useFocusEffect, StackActions} from '@react-navigation/native';

import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import * as GeneralComponents from '../components/GeneralComponents';
import {AuthContext} from '../context/auth-context';
import {GetFormattedName} from '../utils/HelperMethods';
import PlusJakartaSansText from '../../../fonts/PlusJakartaSansText';
import PoppinsText from '../../../fonts/PoppinsText';

const DimensionWidth = Dimensions.get('window').width;

function ProfileScreen({navigation}) {
  const authCtx = React.useContext(AuthContext);
  const [modalVisible, setModalVisible] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');

      Platform.OS === 'android'
        ? StatusBar.setBackgroundColor('white')
        : undefined;
    }, []),
  );

  // async function closeModal() {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       setModalVisible(false);
  //       resolve(); // Resolve with no arguments
  //     }, 1000);
  //   });
  // }

  async function SignOutHandler() {
    //setModalVisible(true);
    Alert.alert(
      'Sign out',
      'Are you sure you want to sign out from this account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: onConfirm,
          style: 'destructive',
        },
      ],
    );
  }

  async function onConfirm() {
    //await closeModal();
    authCtx.SignOut();
    navigation.replace('NotAuthenticated');
    navigation.reset({index: 0, routes: [{name: 'NotAuthenticated'}]});
  }

  async function onClose() {
    setModalVisible(false);
  }

  async function confirmDeactivate() {
    const response = await deactivateAccount(authCtx.NIK);
    Toast.show({
      type: 'notifToast',
      text1: 'Success',
      text2:
        'Your deactivation request has been sent. You will be notified by email if the request is approved.',
      position: 'top',
      props: {bgColor: Colors.primaryColor100},
      onPress: () => navigation.navigate('Notification'),
    });
    navigation.navigate('NotAuthenticated');
  }

  async function deactivateHandler() {
    Alert.alert(
      'Sign out',
      'Are you sure you want to sign out from this account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: confirmDeactivate,
          style: 'destructive',
        },
      ],
    );
  }

  return (
    <>
      <GeneralComponents.Modal
        modalVisible={modalVisible}
        onClose={onClose}
        onConfirm={onConfirm}
      />
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={styles.rootContainer}>
        <GeneralComponents.Background
          containerStyle={{justifyContent: 'flex-start'}}>
          <GeneralComponents.Header
            title="Profile"
            containerStyle={{paddingTop: 12}}
          />
          <View style={[styles.profileContainer, Styles.shadow]}>
            <View style={styles.topContainer}>
              <GeneralComponents.Ionicons
                name="person-circle"
                size={48}
                color={Colors.primaryColor}
              />
              <View style={styles.userDetailContainer}>
                <PoppinsText weight="Bold" style={styles.usernameText}>
                  {authCtx.Username
                    ? GetFormattedName(authCtx.Username)
                    : 'Pengguna B7 Connect'}
                </PoppinsText>
                <PoppinsText style={styles.emailText}>
                  {authCtx.Email ? authCtx.Email : 'penggunab7c@gmail.com'}
                </PoppinsText>
              </View>
            </View>
            <View style={styles.bodyContainer}>
              <GeneralComponents.ButtonOutline
                onPress={() => navigation.navigate('ChangePassword')}>
                Change password
              </GeneralComponents.ButtonOutline>
              <GeneralComponents.Button
                icon="logout"
                onPress={SignOutHandler}
                buttonStyle={{backgroundColor: Colors.redAccent}}>
                Sign out
              </GeneralComponents.Button>
            </View>
            <GeneralComponents.Copyright />
          </View>
        </GeneralComponents.Background>
      </SafeAreaView>
    </>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileContainer: {
    width: DimensionWidth * 0.9,
    margin: 12,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  topContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userDetailContainer: {
    flex: 1,
    marginLeft: 8,
  },
  usernameText: {
    fontSize: 16,
    color: Colors.primaryColor,
    marginBottom: Platform.OS === 'ios' ? 0 : -6,
  },
  emailText: {
    color: Colors.primaryColor,
  },
  bodyContainer: {
    marginTop: 12,
    marginBottom: 8,
  },
});
