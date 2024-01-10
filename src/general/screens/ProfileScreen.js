import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
} from 'react-native';

import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import * as GeneralComponents from '../components/GeneralComponents';

const DimensionWidth = Dimensions.get('window').width;

function ProfileScreen({navigation}) {
  const username = '';
  const email = '';
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={styles.rootContainer}>
        <GeneralComponents.Background
          containerStyle={{justifyContent: 'flex-start'}}>
          <GeneralComponents.Header
            title="Profile"
            containerStyle={{paddingHorizontal: 24}}
          />
          <View style={[styles.profileContainer, Styles.shadow]}>
            <View style={styles.topContainer}>
              <GeneralComponents.Ionicons
                name="person-circle"
                size={48}
                color={Colors.primaryColor}
              />
              <View style={styles.userDetailContainer}>
                <Text style={styles.usernameText}>
                  {username ? username : 'Pengguna B7 Connect'}
                </Text>
                <Text style={styles.emailText}>
                  {email ? email : 'penggunab7c@gmail.com'}
                </Text>
              </View>
            </View>
            <View style={styles.bodyContainer}>
              <GeneralComponents.ButtonOutline
                onPress={() => navigation.navigate('ChangePassword')}>
                Change Password
              </GeneralComponents.ButtonOutline>
              <GeneralComponents.Button
                onPress={() => navigation.navigate('Authentication')}
                buttonStyle={{backgroundColor: Colors.redAccent}}>
                Sign Out
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
    width: DimensionWidth * 0.85,
    margin: 12,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userDetailContainer: {
    marginLeft: 8,
  },
  usernameText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.primaryColor,
  },
  emailText: {
    color: Colors.primaryColor,
  },
  bodyContainer: {
    marginTop: 12,
    marginBottom: 8,
  },
});
