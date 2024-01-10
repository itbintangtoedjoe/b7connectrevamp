import React from 'react';
import {StatusBar, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import * as GeneralComponents from '../../general/components/GeneralComponents';
import * as CAMComponents from '../components/CAMComponents';
import {CAMData} from '../components/CAMContent/CAMData';
import {NetworkErrorHandler} from '../../general/utils/HelperMethods';

function CAMHomeScreen() {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [fallbackMessage, setFallbackMessage] =
    React.useState(`There's nothing here`);

  useFocusEffect(
    React.useCallback(() => {
      async function getCAMContent(nik) {
        setIsLoading(true);
        try {
          const response = CAMData;
          setData(response);
          setIsLoading(false);
        } catch (err) {
          NetworkErrorHandler(err);
          setFallbackMessage('No connection');
          setIsLoading(false);
        }
      }
      getCAMContent();
    }, []),
  );

  let content = (
    <View style={styles.fallbackContainer}>
      <Text style={styles.fallbackText}>
        {fallbackMessage ? fallbackMessage : 'Fallback Message'}
      </Text>
    </View>
  );

  if (data.length > 0) {
    content = <CAMComponents.Content data={data} />;
  }

  if (isLoading) {
    content = (
      <GeneralComponents.LoadingOverlay message="Loading CAM data..." />
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={styles.rootContainer}>
        <GeneralComponents.Background
          containerStyle={{
            justifyContent: 'flex-start',
            padding: 0,
            paddingTop: 12,
          }}>
          <GeneralComponents.Header title="CAM" />
          <GeneralComponents.SearchBar
            containerStyle={{marginBottom: 0, borderColor: 'black'}}
            placeholder="Cari transaksi dengan id/nama requester/remarks"
          />
          {content}
        </GeneralComponents.Background>
      </SafeAreaView>
    </>
  );
}

export default CAMHomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
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
