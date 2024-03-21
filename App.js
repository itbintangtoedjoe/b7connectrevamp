import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Platform,
  Pressable,
  Image,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {Notifications} from 'react-native-notifications';
import {NavigationContainer, useNavigation} from '@react-navigation/native';

import Root from './navigation/navigation';
import AuthContextProvider, {
  AuthContext,
} from './src/general/context/auth-context';
import Colors from './src/general/constants/Colors';
import Styles from './src/general/constants/Styles';
import PoppinsText from './fonts/PoppinsText';
import GeneralIonicons from './src/general/components/GeneralIonicons';
import GeneralMaterialIcons from './src/general/components/GeneralMaterialIcons';

const toastConfig = {
  notifToast: ({text1, text2, props, onPress}) => (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {
          width: '90%',
          justifyContent: 'center',
          margin: 8,
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: 12,
          backgroundColor: Colors.primaryColor,
        },
        Styles.shadow,
        props.bgColor && {backgroundColor: props.bgColor},
        pressed && Styles.pressed,
      ]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 6,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <GeneralMaterialIcons name="bell-ring" color="black" size={18} />
          <PoppinsText
            weight="Bold"
            style={{
              color: 'black',
              marginLeft: 8,
              marginBottom: Platform.OS === 'ios' ? 0 : -2,
            }}>
            {text1}
          </PoppinsText>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <PoppinsText
            style={{
              fontSize: 12,
              color: 'black',
              marginBottom: 2,
            }}>
            now
          </PoppinsText>
        </View>
      </View>
      <PoppinsText
        weight="Medium"
        numberOfLines={3}
        style={{
          color: 'black',
          fontSize: 12,
          marginBottom: Platform.OS === 'ios' ? 0 : -2,
          textAlign: 'justify',
        }}>
        {text2}
      </PoppinsText>
    </Pressable>
  ),
  b7toast: ({text1, text2, props}) => (
    <View
      style={[
        {
          width: '90%',
          margin: 8,
          justifyContent: 'center',
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 12,
          backgroundColor: Colors.primaryColor,
        },
        Styles.shadow,
        props.bgColor && {backgroundColor: props.bgColor},
      ]}>
      <PoppinsText
        weight="Bold"
        style={{
          color: 'white',
          fontSize: 16,
          marginBottom: Platform.OS === 'ios' ? 0 : -4,
        }}>
        {text1}
      </PoppinsText>
      <PoppinsText
        // /numberOfLines={2}
        style={{
          color: 'white',
          fontSize: 14,
          marginBottom: Platform.OS === 'ios' ? 0 : -2,
        }}>
        {text2}
      </PoppinsText>
    </View>
  ),
};

function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <Root />
        <Toast config={toastConfig} />
      </NavigationContainer>
    </AuthContextProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
