import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Linking,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import GeneralAppsItem from './GeneralApps/GeneralAppsItem';
import {GeneralAppsData} from './GeneralApps/GeneralAppsData';
import GeneralApp from './GeneralApps/GeneralApp';
import Colors from '../constants/Colors';

function renderAppsItem(data) {
  return (
    <View>
      <GeneralAppsItem {...data.item} />
    </View>
  );
}

function GeneralApps() {
  const navigation = useNavigation();
  const allAppData = GeneralAppsData;
  const androidAppCount = allAppData.filter(app => {
    return (
      app.isActive && (app.platform == 'both' || app.platform == 'android')
    );
  }).length;
  const iosAppCount = allAppData.filter(app => {
    return app.isActive && (app.platform == 'both' || app.platform == 'ios');
  }).length;

  const openSensory = () => {
    // Replace 'com.example.app' with the actual package name of the app on the Play Store
    const appPackage = 'com.b7.sensoryonline';

    // Construct the Google Play Store URL
    const playStoreUrl = `market://details?id=${appPackage}`;

    // Check if the Google Play Store app is installed
    Linking.canOpenURL(playStoreUrl)
      .then(supported => {
        if (supported) {
          // Open the Google Play Store app
          Linking.openURL(playStoreUrl);
        } else {
          // If the Play Store app is not installed, try opening the app using a deep link
          const deepLink = `yourapp://somepath`; // Replace with the actual deep link or URL scheme

          Linking.openURL(deepLink).catch(() => {
            console.log(
              `The app is not installed, operation failed: ${deepLink}`,
            );
          });
        }
      })
      .catch(error => console.error('An error occurred', error));
  };

  const content = (
    <View style={styles.appsContainer}>
      <GeneralApp
        materialIcon
        app={true}
        appTitle="CAM"
        appIcon="file-sign"
        appColor={Colors.CAMPrimary}
        onPress={() => navigation.navigate('CAM')}
      />
      <GeneralApp
        app={true}
        appTitle="TARA"
        appIcon="star"
        appColor={Colors.TARAPrimary}
        appImage={require('../assets/appLogos/taraicon.png')}
        iconStyle={{padding: 6}}
        onPress={() => navigation.navigate('TARA')}
      />
      <GeneralApp
        materialIcon
        app={true}
        appTitle="Ekspedisi Online"
        appIcon="truck-fast"
        appColor={Colors.EOPrimary}
        onPress={() => navigation.navigate('EO')}
      />
      {Platform.OS === 'android' ? (
        <GeneralApp
          app={true}
          appTitle="Sensory Online"
          appIcon="scan"
          appColor={'white'}
          appImage={require('../assets/appLogos/iconSO.png')}
          onPress={Platform.OS === 'ios' ? undefined : openSensory}
        />
      ) : (
        <></>
      )}

      {/* <GeneralApp
        ionicon
        app={true}
        appTitle="Reservasi Mobil"
        appIcon="car"
        appColor={Colors.ReservasiMobilePrimary}
        onPress={() => console.log('ReservasiMobil')}
      />
      <GeneralApp
        ionicon
        app={true}
        appTitle="Chatbot"
        appIcon="chatbubble-ellipses"
        appColor={Colors.ChatbotPrimary}
        onPress={() => console.log('Chatbot')}
      />
      <GeneralApp
        ionicon
        app={true}
        appTitle="Makan Siang"
        appIcon="fast-food"
        appColor={Colors.MakanSiangPrimary}
        onPress={() => console.log('Makan Siang')}
      />
      <GeneralApp
        ionicon
        app={true}
        appTitle="More"
        appIcon="apps"
        appColor={Colors.secondaryColor}
        iconStyle={{backgroundColor: Colors.secondaryColor}}
        onPress={() => console.log('More')}
      /> */}
    </View>
  );

  const contentFlatlist = (
    <View style={styles.rootContainer}>
      <FlatList
        style={styles.flatlist}
        columnWrapperStyle={{justifyContent: 'space-around'}}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        numColumns={4}
        data={GeneralAppsData}
        renderItem={renderAppsItem}
        // contentContainerStyle={
        //   Platform.OS === 'android'
        //     ? {alignSelf: 'center'}
        //     : iosAppCount.length >= 4
        //     ? {alignSelf: 'center'}
        //     : {alignSelf: 'flex-start'}
        // }
      />
    </View>
  );

  return <>{content}</>;
}

export default GeneralApps;

const styles = StyleSheet.create({
  rootContainer: {
    //borderWidth: 1,
  },
  flatlist: {
    flexGrow: 0,
  },
  appsContainer: {
    //borderWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: Platform.OS === 'android' ? 'stretch' : 'flex-start',
  },
});
