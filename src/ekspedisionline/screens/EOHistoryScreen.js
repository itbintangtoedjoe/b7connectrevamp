import React from 'react';
import {View, Text, StyleSheet, StatusBar, SafeAreaView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';

import * as GeneralComponents from '../../general/components/GeneralComponents';
import * as EOComponents from '../components/EOComponents';
import {getHistoryEO} from '../utils/EOAPIMethods';
import {
  GetFormattedDate,
  NetworkErrorHandler,
} from '../../general/utils/HelperMethods';

function EOHistoryScreen({navigation}) {
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
  //           false,
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
          false,
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
      <GeneralComponents.LoadingOverlay message="Loading delivery history data..." />
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
          <GeneralComponents.Header title="History" />
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

export default EOHistoryScreen;

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
