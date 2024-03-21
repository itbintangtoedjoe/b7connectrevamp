import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Pressable,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {
  Camera,
  useCameraPermission,
  useCameraDevice,
  useCodeScanner,
  CameraPermissionStatus,
} from 'react-native-vision-camera';
import {launchImageLibrary} from 'react-native-image-picker';
import RNQRGenerator from 'rn-qr-generator';
import {useFocusEffect} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import Colors from '../../general/constants/Colors';
import Styles from '../../general/constants/Styles';
import * as GeneralComponents from '../../general/components/GeneralComponents';
import * as EOComponents from '../components/EOComponents';
import {getHistoryDetailEO} from '../utils/EOAPIMethods';
import {AuthContext} from '../../general/context/auth-context';
import {NetworkErrorHandler} from '../../general/utils/HelperMethods';
import MontserratText from '../../../fonts/MontserratText';
import PlusJakartaSansText from '../../../fonts/PlusJakartaSansText';
import PoppinsText from '../../../fonts/PoppinsText';

function EOScanPackageScreen({navigation, route}) {
  const authCtx = React.useContext(AuthContext);
  const [qrValue, setQrValue] = React.useState(null);
  const [data, setData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const {hasPermission, requestPermission} = useCameraPermission();

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');

      Platform.OS === 'android'
        ? StatusBar.setBackgroundColor('white')
        : undefined;
    }, []),
  );

  const actionType = route.params?.action;

  const device = useCameraDevice('back');

  React.useEffect(() => {
    if (qrValue) {
      async function getHistoryDetail() {
        setIsLoading(true);
        try {
          const response = await getHistoryDetailEO(
            'resi',
            qrValue,
            'scan',
            authCtx.EONIK,
          );
          // console.log(response);
          setData(response);
        } catch (err) {
          NetworkErrorHandler(err);
        } finally {
          setIsLoading(false);
        }
      }
      getHistoryDetail(qrValue);
    }
  }, [qrValue]);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      if (!isLoading && !data && !qrValue) {
        codes.forEach(code => {
          if (code.type === 'qr') {
            setQrValue(code.value);
          }
        });
      }
    },
  });

  async function DetectQR(image) {
    try {
      const response = await RNQRGenerator.detect({
        uri: image,
        threshold: 0.2,
        includeText: false,
      });
      if (response && response.values && response.values.length > 0) {
        const qrcode = response.values[0];
        setQrValue(qrcode);
      } else {
        console.log('No QR code detected in image');
        setIsLoading(false);
        Toast.show({
          type: 'b7toast',
          text1: 'Failed',
          text2: `takde qr la`,
          position: 'top',
          props: {bgColor: Colors.CAMRed},
        });
      }
    } catch (error) {
      console.log('Error detecting QR code in image', error);
      setIsLoading(false);
    }
  }

  async function GalleryHandler() {
    setIsLoading(true);
    try {
      const options = {
        mediaType: 'photo',
        quality: 1,
      };
      launchImageLibrary(options, async response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
          setIsLoading(false);
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
          setIsLoading(false);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          setIsLoading(false);
        } else {
          const selectedImageUri = response.assets[0].uri;
          await DetectQR(selectedImageUri);
        }
      });
    } catch (err) {
      console.error('Error selecting image from gallery:', err);
    }
  }

  function closeHandler() {
    setQrValue(null);
    setData(null);
  }

  let content = (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {!isLoading && (
          <GeneralComponents.MaterialIcons
            name="scan-helper"
            size={256}
            color={Colors.EOPrimary}
          />
        )}
        {isLoading && (
          <>
            <ActivityIndicator size={128} color={Colors.EOPrimary} />
            <PoppinsText
              weight="ExtraBold"
              style={[styles.scanCodeText, {marginTop: 12}]}>
              Loading...
            </PoppinsText>
          </>
        )}
      </View>
      <View style={[styles.bottomContainer, Styles.shadow2]}>
        <Pressable
          onPress={() => navigation.pop()}
          style={({pressed}) => [
            styles.bottomButton,
            pressed && Styles.pressed,
          ]}>
          <GeneralComponents.MaterialIcons
            name="arrow-left"
            size={32}
            color="white"
          />
        </Pressable>
        <PoppinsText weight="ExtraBold" style={styles.scanCodeText}>
          Scan QR Code
        </PoppinsText>

        <Pressable
          //onPress={GalleryHandler}
          style={({pressed}) => [
            styles.bottomButton,
            {
              backgroundColor: 'white',
            },
          ]}>
          <GeneralComponents.Ionicons name="image" size={28} color="white" />
        </Pressable>
      </View>
    </>
  );

  if (data && qrValue) {
    content = (
      <EOComponents.QRContent
        data={data}
        actionType={actionType}
        onClose={closeHandler}
      />
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={styles.rootContainer}>
        <View style={styles.cameraContainer}>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            codeScanner={codeScanner}
          />
          {content}
        </View>
      </SafeAreaView>
    </>
  );
}

export default EOScanPackageScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  cameraContainer: {
    flex: 1,
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
    //justifyContent: 'flex-end',
  },
  bottomContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 85,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    backgroundColor: 'white',
  },
  bottomButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: Colors.EOPrimary,
  },
  scanCodeText: {
    fontSize: 20,
    color: Colors.EOPrimary,
    marginBottom: Platform.OS === 'ios' ? 0 : -4,
  },
});
