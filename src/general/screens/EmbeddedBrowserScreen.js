import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';

function EmbeddedBrowserScreen() {
  return (
    <>
      <View style={styles.rootContainer}>
        <Text>EmbeddedBrowserScreen</Text>
      </View>
    </>
  );
}

export default EmbeddedBrowserScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
