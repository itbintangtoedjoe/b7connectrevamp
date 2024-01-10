import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
} from 'react-native';

import Colors from '../constants/Colors';
import * as GeneralComponents from '../components/GeneralComponents';

function HomeScreen({navigation}) {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={styles.rootContainer}>
        <GeneralComponents.HomeHeader />
        <ScrollView
          style={styles.bodyContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.bannersContainer}>
            <GeneralComponents.Banners />
          </View>
          <View style={styles.poinbisaContainer}>
            <GeneralComponents.PoinBisa />
          </View>
          <View style={styles.appsContainer}>
            <GeneralComponents.Apps />
          </View>
          <View style={styles.newsContainer}>
            <GeneralComponents.News />
          </View>
          <View style={styles.bulletinBoardContainer}>
            <GeneralComponents.BulletinBoard />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  bodyContainer: {
    flex: 1,
  },
  bannersContainer: {
    width: '100%',
    height: 'auto',
    aspectRatio: 16 / 9,
    marginBottom: -16,
  },
  poinbisaContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  appsContainer: {
    paddingHorizontal: 16,
  },
  newsContainer: {
    marginTop: 16,
  },
  bulletinBoardContainer: {
    marginTop: 16,
  },
});
