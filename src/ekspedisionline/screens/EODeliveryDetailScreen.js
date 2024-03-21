import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Pressable,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import Colors from '../../general/constants/Colors';
import Styles from '../../general/constants/Styles';
import * as GeneralComponents from '../../general/components/GeneralComponents';
import * as EOComponents from '../components/EOComponents';
import {getTimelineEO, getHistoryDetailEO} from '../utils/EOAPIMethods';
import {NetworkErrorHandler} from '../../general/utils/HelperMethods';
import {GetFormattedName} from '../../general/utils/HelperMethods';
import {AuthContext} from '../../general/context/auth-context';

const dimensionWidth = Dimensions.get('window').width;

function EODeliveryDetailScreen({navigation, route}) {
  const ID = route.params?.id;
  const authCtx = React.useContext(AuthContext);
  const [data, setData] = React.useState([]);
  const [fieldData, setFieldData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [fallbackMessage, setFallbackMessage] = React.useState(`No data found`);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');

      Platform.OS === 'android'
        ? StatusBar.setBackgroundColor('white')
        : undefined;
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      async function getHistory() {
        setIsLoading(true);
        try {
          const fieldResponse = await getHistoryDetailEO(
            'id',
            ID,
            'see-detail',
            authCtx.EONIK,
          );
          const response = await getTimelineEO(ID);
          setFieldData(fieldResponse);
          setData(response);
          setFallbackMessage('No data found');
          setIsLoading(false);
        } catch (err) {
          const networkResponse = await NetworkErrorHandler(err);
          if (networkResponse.length > 0) {
            setFallbackMessage(networkResponse);
          }
          setIsLoading(false);
        }
      }
      getHistory();
    }, []),
  );

  let content = (
    <GeneralComponents.Fallback
      refreshColor={Colors.EOPrimary}
      fallbackMessage={fallbackMessage}
    />
  );

  if (data.length > 0) {
    content = (
      <>
        <View style={{marginTop: 10}}>
          <EOComponents.DetailHeader
            ResiBarang={fieldData.ResiBarang}
            Status={fieldData.Status}
          />
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}>
            <EOComponents.DetailBody
              JenisBarang={
                fieldData.JenisBarang
                  ? GetFormattedName(fieldData.JenisBarang)
                  : ''
              }
              NamaPengirim={
                fieldData.NamaPengirim
                  ? GetFormattedName(fieldData.NamaPengirim)
                  : ''
              }
              NamaPenerima={
                fieldData.NamaPenerima
                  ? GetFormattedName(fieldData.NamaPenerima)
                  : ''
              }
              Keterangan={
                fieldData.Keterangan
                  ? GetFormattedName(fieldData.Keterangan)
                  : ''
              }
            />
            <EOComponents.DetailContent data={data} />
          </ScrollView>
        </View>
      </>
    );
  }

  if (isLoading) {
    content = (
      <View style={styles.loadingContainer}>
        <GeneralComponents.LoadingOverlay
          message="Loading..."
          loadingColor={Colors.EOPrimary}
        />
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={styles.rootContainer}>
        <GeneralComponents.Background
          bg={require('../assets/BG.png')}
          containerStyle={{
            justifyContent: 'flex-start',
            // padding: 0,
            paddingTop: 16,
          }}>
          <GeneralComponents.Header
            title="Detail Pengiriman"
            backButtonColor={Colors.EOPrimary}
          />
          {content}
        </GeneralComponents.Background>
      </SafeAreaView>
    </>
  );
}

export default EODeliveryDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  fallbackText: {
    fontSize: 16,
    color: 'black',
  },
  loadingContainer: {
    flex: 1,
    marginBottom: Platform.OS === 'ios' ? 0 : -24,
  },
});
