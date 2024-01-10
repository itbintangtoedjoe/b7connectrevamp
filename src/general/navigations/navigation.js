import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import * as General from '../screens/GeneralIndex';
import * as CAM from '../../cam/screens/CAMIndex';

const Stack = createNativeStackNavigator();

function CAMStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="CAMHome" component={CAM.HomeScreen} />
      <Stack.Screen name="CAMDetail" component={CAM.DetailScren} />
    </Stack.Navigator>
  );
}

function Authenticated() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={General.HomeScreen} />
      <Stack.Screen
        name="Notification"
        component={General.NotificationScreen}
      />
      <Stack.Screen name="Profile" component={General.ProfileScreen} />
      <Stack.Screen
        name="ChangePassword"
        component={General.ChangePasswordScreen}
      />
      <Stack.Screen name="CAM" component={CAMStack} />
    </Stack.Navigator>
  );
}

function NotAuthenticated() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Authentication"
        component={General.AuthenticationScreen}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={General.ForgotPasswordScreen}
      />
      <Stack.Screen name="Authenticated" component={Authenticated} />
    </Stack.Navigator>
  );
}

function Splash() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={General.SplashScreen} />
    </Stack.Navigator>
  );
}

function CheckAuth() {
  const [authStatus, setAuthStatus] = React.useState(null);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setAuthStatus(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      {authStatus === null && <Splash />}
      {authStatus === true && <Authenticated />}
      {authStatus === false && <NotAuthenticated />}
    </NavigationContainer>
  );
}

function Root() {
  return <CheckAuth />;
}

export default Root;
