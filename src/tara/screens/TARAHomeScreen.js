import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Keyboard,
  ScrollView,
  RefreshControl,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import GeneralIonicons from '../../general/components/GeneralIonicons';

import Colors from '../../general/constants/Colors';
import Styles from '../../general/constants/Styles';
import * as GeneralComponents from '../../general/components/GeneralComponents';
import * as TARAComponents from '../components/TARAComponents';
import {
  getAllDocumentTARA,
  getLatestDocumentTARA,
} from '../utils/TARAAPIMethods';
import {NetworkErrorHandler} from '../../general/utils/HelperMethods';
import PlusJakartaSansText from '../../../fonts/PlusJakartaSansText';
import PoppinsText from '../../../fonts/PoppinsText';

const dimensionWidth = Dimensions.get('window').width;
const dimensionHeight = Dimensions.get('window').height;

function TARAHomeScreen({navigation}) {
  const [data, setData] = React.useState([]);
  const [searchResult, setSearchResult] = React.useState([]);
  const [isKeyboardOpen, setIsKeyboardOpen] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [fallbackMessage, setFallbackMessage] = React.useState(`No data found`);
  const [refresh, setRefresh] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('light-content');

      Platform.OS === 'android'
        ? StatusBar.setBackgroundColor(Colors.primaryColor50)
        : undefined;
    }, []),
  );

  async function onRefresh() {
    setRefresh(!refresh);
  }

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardOpen(true);
        if (Platform.OS === 'android')
          StatusBar.setBackgroundColor(Colors.primaryColor50);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardOpen(false);
        if (Platform.OS === 'android')
          StatusBar.setBackgroundColor(Colors.primaryColor50);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [isKeyboardOpen]);

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'search':
        setIsSearching(enteredValue);
        break;
    }
  }

  React.useEffect(() => {
    async function getLatest() {
      setIsLoading(true);
      try {
        const response = await getLatestDocumentTARA();
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
      setIsLoading(false);
    }

    async function getSearch() {
      setIsLoading(true);
      try {
        const response = await getAllDocumentTARA(data, isSearching);
        setSearchResult(response);
        setFallbackMessage('No data found');
        setIsLoading(false);
      } catch (err) {
        const networkResponse = await NetworkErrorHandler(err);
        if (networkResponse.length > 0) {
          setFallbackMessage(networkResponse);
        }
        setIsLoading(false);
      }
      setIsLoading(false);
    }

    if (isSearching) {
      getSearch();
    } else {
      getLatest();
    }
  }, [isSearching, refresh]);

  let content = (
    <View style={styles.documentCarouselContainer}>
      <View style={{flex: 1}}>
        <PoppinsText weight="Bold" style={styles.documentCarouselTitle}>
          {isSearching ? 'Hasil Pencarian' : 'Dokumen Terbaru'}
        </PoppinsText>
      </View>
      <View style={{flex: 9}}>
        {isLoading && (
          <GeneralComponents.LoadingOverlay
            message={
              isSearching ? 'Mencari dokumen...' : 'Memuat dokumen terbaru...'
            }
          />
        )}
        {data.length > 0 && !isLoading && (
          <TARAComponents.DocumentCarousel
            data={isSearching ? searchResult : data}
          />
        )}
        {data.length <= 0 && !isLoading && (
          <GeneralComponents.Fallback
            refreshColor={Colors.primaryColor50}
            fallbackMessage={fallbackMessage}
            onRefresh={onRefresh}
          />
        )}
      </View>
    </View>
  );

  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.primaryColor50}
      />
      <SafeAreaView style={styles.rootContainer}>
        <View style={styles.headerContainer}>
          <TARAComponents.HomeHeaderLogo />
          <GeneralComponents.SearchBar
            containerStyle={[
              {borderWidth: 0, marginVertical: 8},
              Styles.shadow2,
            ]}
            iconColor={Colors.primaryColor50}
            onUpdateValue={updateInputValueHandler.bind(this, 'search')}
          />
        </View>
        <ScrollView
          scrollEnabled={false}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={onRefresh}
              colors={[Colors.primaryColor50]}
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.bodyContainer, Styles.shadow2]}>
          {content}
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backButtonStyle}>
          <GeneralIonicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

export default TARAHomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    width: dimensionWidth,
    height: dimensionHeight,
    justifyContent: 'flex-end',
    backgroundColor: Colors.primaryColor50,
  },
  headerContainer: {
    width: dimensionWidth,
    height: dimensionHeight * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  bodyContainer: {
    width: dimensionWidth,
    height: dimensionHeight * 0.75,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    backgroundColor: 'white',
  },
  documentCarouselContainer: {
    flex: 1,
    paddingBottom: 50,
  },
  documentCarouselTitle: {
    fontSize: 16,
    alignSelf: 'flex-start',
    marginTop: 16,
    marginLeft: 24,
    color: 'black',
  },
  backButtonStyle: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? '7%' : 10,
    left: 10,
  },
});
