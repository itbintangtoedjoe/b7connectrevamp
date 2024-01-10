import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import Root from './navigation/navigation';

function App() {
  return <Root />;
}

export default App;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
