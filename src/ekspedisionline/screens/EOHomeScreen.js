import {useCallback} from 'react';
import {View, Text, StyleSheet, StatusBar, SafeAreaView} from 'react-native';
//import {useNavigation} from '@react-navigation/native';

import Colors from '../../general/constants/Colors';
import Styles from '../../general/constants/Styles';
import * as GeneralComponents from '../../general/components/GeneralComponents';
import * as EOComponents from '../components/EOComponents';

function EOHomeScreen({navigation}) {
  //const navigation = useNavigation();
  const adminName = '';
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={styles.rootContainer}>
        <GeneralComponents.Background>
          <View style={styles.topContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Ekspedisi Online</Text>
              <Text style={styles.descriptionText}>
                Cek status ekspedisi barang anda.
              </Text>
            </View>
          </View>
          <View style={styles.bodyContainer}>
            <EOComponents.HomeButton
              onPress={() => navigation.navigate('EOScan')}
              materialIcon
              title="Scan Barang"
              name="qrcode-scan"
              size={42}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <EOComponents.HomeButton
                  onPress={() => navigation.navigate('EOOngoing')}
                  outline
                  materialIcon
                  title="Diproses"
                  name="truck-fast"
                  color={Colors.primaryColor}
                  size={32}
                  textStyle={{
                    fontSize: 16,
                    color: Colors.primaryColor,
                    marginLeft: 8,
                  }}
                />
              </View>
              <View style={styles.buttonContainer}>
                <EOComponents.HomeButton
                  onPress={() => navigation.navigate('EOHistory')}
                  outline
                  materialIcon
                  title="Selesai"
                  name="truck-check"
                  color={Colors.primaryColor}
                  size={32}
                  textStyle={{
                    fontSize: 16,
                    color: Colors.primaryColor,
                    marginLeft: 8,
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <View>
              <Text style={styles.adminText}>Nama Admin Dept. Anda:</Text>
              <Text style={styles.userText}>
                {adminName ? adminName : 'Karyawan Magang'}
              </Text>
            </View>
          </View>
        </GeneralComponents.Background>
      </SafeAreaView>
    </>
  );
}

export default EOHomeScreen;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  topContainer: {
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 32,
    marginBottom: 4,
    color: Colors.primaryColor,
  },
  descriptionText: {
    color: Colors.primaryColor,
    textAlign: 'center',
  },
  bodyContainer: {
    width: '90%',
    marginVertical: 24,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    width: '47%',
  },
  bottomContainer: {
    width: '90%',
    alignItems: 'flex-end',
  },
  adminText: {
    fontWeight: 'bold',
    color: Colors.primaryColor,
    textAlign: 'right',
  },
  userText: {
    color: Colors.primaryColor,
    textAlign: 'right',
  },
});
