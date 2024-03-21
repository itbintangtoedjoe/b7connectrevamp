import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Dimensions,
  Platform,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import Colors from '../constants/Colors';
import * as GeneralComponents from '../components/GeneralComponents';
import PoppinsText from '../../../fonts/PoppinsText';
import WebView from 'react-native-webview';
import GeneralHeader from '../components/GeneralHeader';

const dimensionWidth = Dimensions.get('window').width;

function NewsDetailScreen({navigation, route}) {
  const item = route.params?.item;
  let htmlContent = item.content;

  htmlContent =
    '<style>img { display: block; max-width: 100%; height: auto; }</style>' +
    htmlContent;

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle(
        Platform.OS === 'ios' ? 'dark-content' : 'light-content',
      );

      Platform.OS === 'android'
        ? StatusBar.setBackgroundColor('black')
        : undefined;
    }, []),
  );

  return (
    <>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor="black"
      />
      <SafeAreaView style={styles.rootContainer}>
        <GeneralHeader
          title={item.title}
          containerStyle={{backgroundColor: 'black', minHeight: 75}}
          textStyle={{
            color: 'white',
            // fontSize: 1,
            padding: 10,
            textAlign: 'center',
          }}
          backButtonColor="white"
        />
        <WebView
          source={{html: htmlContent}}
          // style={{height: '100%', width: '100%', resizeMode: 'cover', flex: 1}}
          // injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=1, maximum-scale=1, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
          scalesPageToFit={false}
        />
      </SafeAreaView>
    </>
  );
}

export default NewsDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});
