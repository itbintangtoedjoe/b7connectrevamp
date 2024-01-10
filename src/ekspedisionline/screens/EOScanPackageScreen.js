import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Platform,
} from 'react-native';
import {
  Camera,
  useCameraPermission,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';

import * as EOComponents from '../components/EOComponents';

function EOScanPackageScreen() {
  const [qrValue, setQrValue] = React.useState('');
  const [isActive, setIsActive] = React.useState(Platform.OS === 'ios');
  const [deviceMobile, setDeviceMobile] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  requestPermission();

  React.useEffect(() => {
    console.log(device);
  }, [hasPermission]);

  // React.useEffect(() => {
  //   console.log('permission', hasPermission);
  //   if (Platform.OS === 'ios') {
  //     return;
  //   }
  //   if (hasPermission && device) {
  //     const timeout = setTimeout(() => setIsActive(true), 1e3);
  //     return () => clearTimeout(timeout);
  //   }

  //   setIsActive(false);
  // }, [device, hasPermission]);

  let isScanned;

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      codes.forEach(code => {
        if (code.value !== qrValue) {
          isScanned = false;
        }
        if (!isScanned && code.type === 'qr') {
          setQrValue(code.value);
          setModalVisible(true);
          isScanned = true;
        }
      });
    },
  });

  const modal = (
    <EOComponents.QRModal
      modalVisible={modalVisible}
      onClose={() => setModalVisible(false)}
      qrValue={qrValue}
    />
  );

  //   if (hasPermission) {
  //     return (
  //       <View style={styles.rootContainer}>
  //         <View style={styles.cameraContainer}>
  //           <Camera
  //             style={StyleSheet.absoluteFill}
  //             device={device}
  //             isActive={true}
  //             codeScanner={codeScanner}
  //           />
  //           <Text>{qrValue}</Text>
  //         </View>
  //       </View>
  //     );
  //   } else {
  //     return <Text>Nope</Text>;
  //   }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.cameraContainer}>
        {modal}
        {!modalVisible && (
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            codeScanner={codeScanner}
          />
        )}
      </View>
    </View>
  );
}

export default EOScanPackageScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  cameraContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
