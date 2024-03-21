import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import Colors from '../../general/constants/Colors';
import Styles from '../../general/constants/Styles';
import * as GeneralComponents from '../../general/components/GeneralComponents';
import * as TARAComponent from '../components/TARAComponents';
import {getSubcategoriesTARA} from '../utils/TARAAPIMethods';
import {NetworkErrorHandler} from '../../general/utils/HelperMethods';

const dimensionWidth = Dimensions.get('window').width;

function TARASubCategoryScreen({route, navigation}) {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [fallbackMessage, setFallbackMessage] = React.useState(`No data found`);
  const [refresh, setRefresh] = React.useState(false);

  const kategori = route.params?.kategori;
  const id = route.params?.id;

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');

      Platform.OS === 'android'
        ? StatusBar.setBackgroundColor('white')
        : undefined;
    }, []),
  );

  async function onRefresh() {
    setRefresh(!refresh);
  }

  React.useEffect(() => {
    async function getSubcategories() {
      setIsLoading(true);
      try {
        const response = await getSubcategoriesTARA(id);
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

    getSubcategories();
  }, [refresh]);

  let content = (
    <GeneralComponents.Fallback
      refreshColor={Colors.TARAPrimary}
      fallbackMessage={fallbackMessage}
      onRefresh={onRefresh}
    />
  );

  if (data.length > 0) {
    content = <TARAComponent.SubCategoryContent data={data} />;
  }

  if (isLoading) {
    content = <GeneralComponents.LoadingOverlay message="Loading..." />;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={styles.rootContainer}>
        <GeneralComponents.Background
          containerStyle={{
            justifyContent: 'flex-start',
            marginVertical: 12,
            paddingBottom: 50,
          }}>
          <GeneralComponents.Header
            title={kategori}
            backButtonColor={Colors.TARAPrimary}
          />
          {content}
        </GeneralComponents.Background>
      </SafeAreaView>
    </>
  );
}

export default TARASubCategoryScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});
