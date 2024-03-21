import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Pressable,
  Platform,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import * as GeneralComponents from '../../general/components/GeneralComponents';
import * as CAMComponents from '../components/CAMComponents';
import {NetworkErrorHandler} from '../../general/utils/HelperMethods';
import Colors from '../../general/constants/Colors';
import {
  GetPendingTaskCAM,
  GetSearchPendingTaskCam,
} from '../utils/CAMAPIMethods';
import {AuthContext} from '../../general/context/auth-context';

const dimensionWidth = Dimensions.get('window').width;

function CAMHomeScreen({navigation, route}) {
  const itemId = route.params?.id;
  const tess = route.params?.tes;

  const authCtx = React.useContext(AuthContext);
  const [data, setData] = React.useState([]);
  const [searchResult, setSearchResult] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(itemId ? itemId : '');
  const [isLoading, setIsLoading] = React.useState(true);
  const [fallbackMessage, setFallbackMessage] = React.useState(`No data found`);
  const [refresh, setRefresh] = React.useState(true);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      Platform.OS === 'android'
        ? StatusBar.setBackgroundColor('white')
        : undefined;
      onRefresh();
    }, []),
  );

  async function onRefresh() {
    setRefresh(true);
  }

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'search':
        setIsSearching(enteredValue);
        break;
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      async function getAllCAMContent(userAd) {
        setIsLoading(true);
        try {
          const response = await GetPendingTaskCAM(userAd);
          setFallbackMessage('No data found');
          setData(response);
        } catch (err) {
          const networkResponse = NetworkErrorHandler(err);
          if (networkResponse.length > 0) {
            setFallbackMessage(networkResponse);
          }
        }
        if (!refresh) setIsLoading(false);
        setRefresh(false);
      }

      async function getSearchCamContent(keyword) {
        setIsLoading(true);
        try {
          const response = await GetSearchPendingTaskCam(data, keyword);
          setFallbackMessage('No data found');
          setSearchResult(response);
        } catch (err) {
          const networkResponse = await NetworkErrorHandler(err);
          if (networkResponse.length > 0) {
            setFallbackMessage(networkResponse);
          }
        }
        setIsLoading(false);
      }

      if (!isSearching || refresh) {
        getAllCAMContent(authCtx.UserAD);
      } else if (isSearching) {
        getSearchCamContent(isSearching);
      }
    }, [isSearching, refresh]),
  );

  let content = (
    <GeneralComponents.LoadingOverlay
      message="Loading..."
      loadingColor={'black'}
    />
  );

  if (data.length > 0 && !isLoading) {
    content = (
      <CAMComponents.Content
        data={isSearching ? searchResult : data}
        onRefreshList={onRefresh}
      />
    );
  }

  if (
    (!isLoading && data.length == 0) ||
    (!isLoading && isSearching && searchResult.length == 0)
  ) {
    content = (
      <GeneralComponents.Fallback
        fallbackMessage={fallbackMessage}
        onRefresh={onRefresh}
      />
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
            padding: 0,
            paddingTop: 12,
          }}>
          <GeneralComponents.Header
            title="CAM"
            backButtonColor={Colors.CAMPrimary}
          />
          <GeneralComponents.SearchBar
            iconColor={Colors.CAMPrimary}
            containerStyle={{
              marginBottom: 0,
              borderColor: Colors.CAMPrimary,
            }}
            placeholder="Find transaction by id/requestor/remarks"
            textInputConfig={{
              numberOfLines: 1,
              value: isSearching,
            }}
            onUpdateValue={updateInputValueHandler.bind(this, 'search')}
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
});
