import React from 'react';
import {View, StyleSheet} from 'react-native';
import EODetailList from './EODetailContent/EODetailList';

function EODetailContent({data}) {
  return (
    <View style={styles.historyContentContainer}>
      <EODetailList data={data} />
    </View>
  );
}

export default EODetailContent;

const styles = StyleSheet.create({
  historyContentContainer: {
    width: '100%',
    flex: 1,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  fallbackText: {
    fontSize: 16,
    color: 'black',
  },
});
