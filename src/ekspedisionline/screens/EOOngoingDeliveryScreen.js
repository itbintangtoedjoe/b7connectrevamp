import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Pressable,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';

import Colors from '../../general/constants/Colors';
import * as GeneralComponents from '../../general/components/GeneralComponents';
import * as EOComponents from '../components/EOComponents';
import {getHistoryEO} from '../utils/EOAPIMethods';
import {
  GetFormattedDate,
  NetworkErrorHandler,
} from '../../general/utils/HelperMethods';

const dimensionWidth = Dimensions.get('window').width;

function EOOngoingDeliveryScreen({navigation}) {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [fallbackMessage, setFallbackMessage] =
    React.useState(`There's nothing here`);

  const date = new Date();
  const dateminus7 = date.setDate(date.getDate() - 7);

  const [fromDate, setFromDate] = React.useState(new Date(dateminus7));
  const [toDate, setToDate] = React.useState(new Date());
  const fromDateSet = fromDate.setHours(0, 0, 0, 0);
  const toDateSet = toDate.setHours(23, 59, 59, 999);
  const formattedFromDate = GetFormattedDate(fromDate);
  const formattedToDate = GetFormattedDate(toDate);

  const [fromModalOpen, setFromModalOpen] = React.useState(false);
  const [toModalOpen, setToModalOpen] = React.useState(false);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     async function getHistory() {
  //       setIsLoading(true);
  //       try {
  //         const response = await getHistoryEO(
  //           '211002338',
  //           true,
  //           fromDateSet,
  //           toDateSet,
  //         );
  //         setData(response);
  //         setIsLoading(false);
  //       } catch (err) {
  //         NetworkErrorHandler(err);
  //         setFallbackMessage('No connection');
  //         setIsLoading(false);
  //       }
  //     }
  //     getHistory();
  //   }, [fromDate, toDate]),
  // );

  React.useEffect(() => {
    async function getHistory() {
      setIsLoading(true);
      try {
        const response = await getHistoryEO(
          '211002338',
          true,
          fromDateSet,
          toDateSet,
        );
        setData(response);
        setIsLoading(false);
      } catch (err) {
        NetworkErrorHandler(err);
        setFallbackMessage('No connection');
        setIsLoading(false);
      }
    }
    getHistory();
  }, [fromDate, toDate]);

  const fromDatePicker = (
    <DatePicker
      modal
      mode="date"
      open={fromModalOpen}
      date={fromDate}
      maximumDate={new Date(toDate)}
      onConfirm={date => {
        setFromModalOpen(false);
        setFromDate(new Date(date));
      }}
      onCancel={() => {
        setFromModalOpen(false);
      }}
    />
  );
  const toDatePicker = (
    <DatePicker
      modal
      mode="date"
      open={toModalOpen}
      date={toDate}
      minimumDate={new Date(fromDate)}
      maximumDate={new Date()}
      onConfirm={date => {
        setToModalOpen(false);
        setToDate(new Date(date));
      }}
      onCancel={() => {
        setToModalOpen(false);
      }}
    />
  );

  let content = (
    <View style={styles.fallbackContainer}>
      <Text style={styles.fallbackText}>
        {fallbackMessage ? fallbackMessage : 'Fallback Message'}
      </Text>
    </View>
  );

  if (data.length > 0) {
    content = <EOComponents.Content data={data} />;
  }

  if (isLoading) {
    content = (
      <GeneralComponents.LoadingOverlay message="Loading ongoing delivery data..." />
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
            paddingTop: 16,
          }}>
          {fromDatePicker}
          {toDatePicker}
          <GeneralComponents.Header title="Ongoing" />
          <EOComponents.DatePicker
            formattedFromDate={formattedFromDate}
            formattedToDate={formattedToDate}
            onClikedFrom={() => setFromModalOpen(true)}
            onClickedTo={() => setToModalOpen(true)}
          />
          {content}
        </GeneralComponents.Background>
      </SafeAreaView>
    </>
  );
}

export default EOOngoingDeliveryScreen;

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
