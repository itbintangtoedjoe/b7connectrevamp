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
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import Colors from '../../general/constants/Colors';
import Styles from '../../general/constants/Styles';
import * as GeneralComponents from '../../general/components/GeneralComponents';
import * as EOComponents from '../components/EOComponents';
import {getHistoryDetailEO} from '../utils/EOAPIMethods';
import {NetworkErrorHandler} from '../../general/utils/HelperMethods';

const dimensionWidth = Dimensions.get('window').width;

function EODeliveryDetailScreen({navigation, route}) {
  const ID = route.params?.id;
  const ResiBarang = route.params?.resi;
  const NamaPengirim = route.params?.pengirim;
  const NamaPenerima = route.params?.penerima;
  const Status = route.params?.status;
  const DetailStatus = route.params?.detail;
  const JenisBarang = route.params?.jenis;
  const Keterangan = route.params?.keterangan;

  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [fallbackMessage, setFallbackMessage] =
    React.useState(`There's nothing here`);

  useFocusEffect(
    React.useCallback(() => {
      async function getHistory() {
        setIsLoading(true);
        try {
          const response = await getHistoryDetailEO(ID);
          setData(response);
          setIsLoading(false);
        } catch (err) {
          NetworkErrorHandler(err);
          setFallbackMessage('No connection');
          setIsLoading(false);
        }
      }
      getHistory();
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
    content = <EOComponents.DetailContent data={data} />;
  }

  if (isLoading) {
    content = (
      <View style={styles.loadingContainer}>
        <GeneralComponents.LoadingOverlay message="Loading delivery detail data..." />
      </View>
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
            paddingTop: 24,
          }}>
          <EOComponents.DetailHeader ResiBarang={ResiBarang} Status={Status} />
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}>
            <EOComponents.DetailBody
              JenisBarang={JenisBarang}
              NamaPengirim={NamaPengirim}
              NamaPenerima={NamaPenerima}
              Keterangan={Keterangan}
            />
            {content}
          </ScrollView>
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
    marginTop: -24,
  },
});
