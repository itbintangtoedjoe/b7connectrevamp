import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Pdf from 'react-native-pdf';

import Colors from '../../general/constants/Colors';
import Styles from '../../general/constants/Styles';
import * as GeneralComponents from '../../general/components/GeneralComponents';

const dimensionWidth = Dimensions.get('window').width;
const dimensionHeight = Dimensions.get('window').height;

function TARADocumentViewerScreen({route, navigation}) {
  const title = route.params?.title;
  const uri = route.params?.uri;

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('light-content');

      Platform.OS === 'android'
        ? StatusBar.setBackgroundColor(Colors.TARAPrimary)
        : undefined;
    }, []),
  );

  const source = {
    uri: encodeURI(uri),
    // cache: true,
    // Headers: {
    //   Authorization: 'Basic azIuc2VydmljZToxdzNFYUY5bzBAcGY=',
    // },
  };

  // const source = {
  //   uri: 'https://webportal.bintang7.com/k2attachment/GetAttachment?key=bUVWL0NLU0U1QkMxNEQ1TXdPbjRQSy9TMkdmZkpYaTFVRkowd0RHQ256aEpxdUF5VnhyTDROcnQvYWlrNkZoTFJ1am82bjVCZHQzVS8wbVhKRHJQNVNicDkycU1ncStEZzlNODNXV1FzbW05TjVpYi9nTXZweGZLU1AvQzJ2SEZiNzdOaWJMN1c4RW1kV1oyenptejZQQkxZbFRZUENlU01kNnJWMDJXS09hb1F2RUxqdGV4cHhkc3VrS1lGZGU1',
  //   cache: false,
  //   Headers: {
  //     Authorization: 'Basic azIuc2VydmljZToxdzNFYUY5bzBAcGY=',
  //   },
  // };

  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.TARAPrimary}
      />
      <SafeAreaView style={styles.rootContainer}>
        <View style={[styles.headerContainer, Styles.shadow]}>
          <GeneralComponents.Header
            title="Document Content"
            backButtonColor={Colors.TARAPrimary}
            // textStyle={{textAlign: 'center', color: 'white', fontSize: 18}}
          />
        </View>
        <View style={{flex: 1}}>
          <View style={[styles.pdfContainer, Styles.shadow]}>
            <Pdf
              source={source}
              trustAllCerts={false}
              // onLoadComplete={(numberOfPages, filePath) => {
              //   console.log(`Number of pages: ${numberOfPages}`);
              // }}
              // onPageChanged={(page, numberOfPages) => {
              //   console.log(`Current page: ${page}`);
              // }}
              // onError={error => {
              //   console.log(error);
              // }}
              // onPressLink={uri => {
              //   console.log(`Link pressed: ${source}`);
              // }}
              style={styles.pdf}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

export default TARADocumentViewerScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.TARAPrimary,
  },
  headerContainer: {
    // width: dimensionWidth,
    // paddingHorizontal: 16,
    // paddingVertical: 16,
    backgroundColor: Colors.TARAPrimary,
  },
  pdfContainer: {
    width: '100%',
    height: '100%',
    borderColor: Colors.TARAPrimary,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  pdf: {
    flex: 1,
    backgroundColor: 'white',
  },
});
