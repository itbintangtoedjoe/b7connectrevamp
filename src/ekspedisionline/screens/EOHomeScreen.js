import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Platform,
  Linking,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {
  Camera,
  useCameraPermission,
  useCameraDevice,
  useCodeScanner,
  CameraPermissionStatus,
} from 'react-native-vision-camera';
import Toast from 'react-native-toast-message';

import Colors from '../../general/constants/Colors';
import Styles from '../../general/constants/Styles';
import * as GeneralComponents from '../../general/components/GeneralComponents';
import * as EOComponents from '../components/EOComponents';
import {AuthContext} from '../../general/context/auth-context';
import MontserratText from '../../../fonts/MontserratText';
import PlusJakartaSansText from '../../../fonts/PlusJakartaSansText';
import PoppinsText from '../../../fonts/PoppinsText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GeneralIonicons from '../../general/components/GeneralIonicons';

const dimensionWidth = Dimensions.get('window').width;

function EOHomeScreen({route, navigation}) {
  const authCtx = React.useContext(AuthContext);
  const {hasPermission, requestPermission} = useCameraPermission();

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');

      Platform.OS === 'android'
        ? StatusBar.setBackgroundColor('white')
        : undefined;
    }, []),
  );

  async function permissionHandler(action) {
    const isNotFirstTime = await AsyncStorage.getItem('cameraPermission');
    const response = await requestPermission();
    console.log('permission', response);
    if (response === true) {
      navigation.navigate('EOScan', {action: action});
    } else if (response === false && !isNotFirstTime) {
      Toast.show({
        type: 'b7toast',
        text1: 'Gagal',
        text2: `Fitur ini membutuhkan akses kamera`,
        position: 'top',
        props: {bgColor: Colors.redAccent},
      });
      await AsyncStorage.setItem('cameraPermission', 'true');
    } else if (response === false && isNotFirstTime) {
      Alert.alert(
        'Izinkan akses kamera',
        'Akses kamera diperlukan untuk menggunakan fitur ini',
        [
          {
            text: 'Pengaturan',
            onPress: () => Linking.openSettings(),
            style: 'destructive',
          },
        ],
      );
    }
  }

  const title = (
    <View style={styles.topContainer}>
      <View style={styles.titleContainer}>
        <PoppinsText weight="Bold" style={styles.titleText}>
          Ekspedisi Online
        </PoppinsText>
        <PoppinsText weight="Medium" style={styles.descriptionText}>
          {authCtx.EONamaRole === 'Karyawan B7' ||
          authCtx.EONamaRole === 'Admin'
            ? 'Cek status ekspedisi barang anda.'
            : 'Update status pengiriman barang.'}
        </PoppinsText>
      </View>
    </View>
  );

  const menuUser = (
    <>
      <EOComponents.HomeButton
        // onPress={() =>
        //   navigation.navigate('EOScan', {action: 'TerimaKaryawan'})
        // }
        onPress={() => permissionHandler('TerimaKaryawan')}
        title="Scan barang"
        name="qrcode-scan"
        size={42}
      />
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <EOComponents.HomeButton
            onPress={() => navigation.navigate('EOOngoing')}
            outline
            title="Diproses"
            name="truck-fast"
            size={32}
            textStyle={{
              fontSize: 16,
              marginLeft: 8,
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <EOComponents.HomeButton
            onPress={() => navigation.navigate('EOHistory')}
            outline
            title="Selesai"
            name="truck-check"
            size={32}
            textStyle={{
              fontSize: 16,
              marginLeft: 8,
            }}
          />
        </View>
      </View>
    </>
  );

  const menuDriver = (
    <View style={styles.buttonsContainer}>
      <View style={styles.buttonContainer}>
        <EOComponents.HomeButton
          // onPress={() =>
          //   navigation.navigate('EOScan', {action: 'KirimPetugas'})
          // }
          onPress={() => permissionHandler('KirimPetugas')}
          outline
          title="Kirim"
          name="cube-send"
          size={42}
          textStyle={{
            fontSize: 20,
            marginLeft: 8,
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <EOComponents.HomeButton
          // onPress={() =>
          //   navigation.navigate('EOScan', {action: 'TerimaPetugas'})
          // }
          onPress={() => permissionHandler('TerimaPetugas')}
          outline
          title="Terima"
          name="cube-scan"
          size={42}
          textStyle={{
            fontSize: 20,
            marginLeft: 8,
          }}
        />
      </View>
    </View>
  );

  const menuPetugas = (
    <View style={[styles.buttonsContainer, {justifyContent: 'center'}]}>
      <View style={[styles.buttonContainer, {width: dimensionWidth * 0.5}]}>
        <EOComponents.HomeButton
          // onPress={() =>
          //   navigation.navigate('EOScan', {action: 'TerimaPetugas'})
          // }
          onPress={() => permissionHandler('TerimaPetugas')}
          outline
          title="Terima"
          name="cube-scan"
          size={42}
          textStyle={{
            fontSize: 24,
            marginLeft: 8,
          }}
        />
      </View>
    </View>
  );

  const menu = (
    <View style={styles.bodyContainer}>
      {authCtx.EONamaRole === 'Karyawan B7' || authCtx.EONamaRole === 'Admin'
        ? menuUser
        : authCtx.EONamaRole === 'Driver'
        ? menuDriver
        : menuPetugas}
    </View>
  );

  const admin = (
    <View style={styles.bottomContainer}>
      <View>
        <PoppinsText weight="Bold" style={styles.adminText}>
          Nama Admin Dept. Anda:
        </PoppinsText>
        <PoppinsText style={styles.userText}>
          {authCtx.EONamaAdmin ? authCtx.EONamaAdmin : '-'}
        </PoppinsText>
      </View>
    </View>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={styles.rootContainer}>
        <GeneralComponents.Background bg={require('../assets/BG.png')}>
          {title}
          {menu}
          {admin}
        </GeneralComponents.Background>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backButtonStyle}>
          <GeneralIonicons
            name="arrow-back"
            size={24}
            color={Colors.EOPrimary}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

export default EOHomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  topContainer: {
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
  },
  titleText: {
    fontSize: 32,
    color: Colors.EOPrimary,
    marginBottom: Platform.OS === 'ios' ? 0 : -8,
  },
  descriptionText: {
    color: Colors.EOPrimary,
    textAlign: 'center',
    marginBottom: Platform.OS === 'ios' ? 0 : -4,
  },
  bodyContainer: {
    width: dimensionWidth * 0.9,
    marginVertical: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    width: dimensionWidth * 0.43,
  },
  bottomContainer: {
    width: dimensionWidth * 0.9,
    alignItems: 'flex-end',
  },
  adminText: {
    color: Colors.EOPrimary,
    textAlign: 'right',
    marginBottom: Platform.OS === 'ios' ? 0 : -4,
  },
  userText: {
    color: Colors.EOPrimary,
    textAlign: 'right',
    marginBottom: Platform.OS === 'ios' ? 0 : -2,
  },
  backButtonStyle: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? '7%' : 10,
    left: 10,
  },
});
