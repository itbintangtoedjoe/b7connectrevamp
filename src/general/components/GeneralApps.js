import {View, Text, StyleSheet, FlatList} from 'react-native';
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
        appColor={Colors.primaryColor}
        appImage={require('../assets/appLogos/taraicon.png')}
        iconStyle={{padding: 6}}
        onPress={() => console.log('TARA')}
      />
      <GeneralApp
        materialIcon
        app={true}
        appTitle="Ekspedisi Online"
        appIcon="truck-fast"
        appColor={Colors.EOPrimary}
        onPress={() => navigation.navigate('EO')}
      />
      <GeneralApp
        app={true}
        appTitle="Sensory Online"
        appIcon="scan"
        appColor={Colors.SOPrimary}
        appImage={require('../assets/appLogos/iconSO.png')}
        onPress={() => console.log('SensoryOnline')}
      />
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
  },
});
