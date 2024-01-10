import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';

function RegisterUserScreen() {
  return (
    <>
      <View style={styles.rootContainer}>
        <Text>RegisterUserScreen</Text>
      </View>
    </>
  );
}

export default RegisterUserScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
