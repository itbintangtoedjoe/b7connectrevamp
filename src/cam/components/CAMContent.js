import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import GeneralLoadingOverlay from '../../general/components/GeneralLoadingOverlay';
import CAMList from './CAMContent/CAMList';
import {CAMData} from './CAMContent/CAMData';
import {NetworkErrorHandler} from '../../general/utils/HelperMethods';
import {GetPendingTaskCAM} from '../utils/CAMAPIMethods';
import CAMModal from './CAMContent/CAMModal';

function CAMContent({data}) {
  return (
    <View style={styles.camContentContainer}>
      <CAMList data={data} />
    </View>
  );
}

export default CAMContent;

const styles = StyleSheet.create({
  camContentContainer: {
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
