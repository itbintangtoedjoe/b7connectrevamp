import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';

function CAMDetailScreen({navigation, route}) {
  const viewId = route.params?.viewId;
  return (
    <>
      <View style={styles.rootContainer}>
        <Text>CAMDetailScreen</Text>
        <Text>{viewId}</Text>
      </View>
    </>
  );
}

export default CAMDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
