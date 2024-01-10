import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Dimensions,
  Pressable,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Colors from '../../general/constants/Colors';
import Styles from '../../general/constants/Styles';
import GeneralFormInput from '../../general/components/GeneralFormInput';
import GeneralButton from '../../general/components/GeneralButton';
import GeneralButtonOutline from '../../general/components/GeneralButtonOutline';
import GeneralPasswordToggle from '../../general/components/GeneralPasswordToggle';

const DimensionWidth = Dimensions.get('window').width;

function EOQRModal({modalVisible, onClose, qrValue}) {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);

  React.useEffect(() => {
    if (modalVisible) {
      setIsVisible(true);
    } else if (!modalVisible) {
      setIsVisible(false);
    }
  }, [modalVisible]);

  function viewHandler() {
    setIsSearching(true);
  }

  function closeHandler() {
    onClose();
  }

  const modal = (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeHandler}>
      <Pressable onPress={closeHandler} style={styles.modalBackground}>
        <Pressable style={[styles.modalContainer, Styles.shadow]}>
          <View style={styles.modalForm}>
            <Text style={styles.modalLabel}>Nomor Resi</Text>
            <Text style={styles.qrText}>{qrValue}</Text>
            <GeneralButton onPress={viewHandler}>Cari Data</GeneralButton>
            <GeneralButtonOutline onPress={closeHandler}>
              Scan Ulang
            </GeneralButtonOutline>
          </View>
          {isSearching && (
            <>
              <View
                style={{
                  marginTop: 16,
                  marginBottom: 8,
                  width: '100%',
                  height: 200,
                  backgroundColor: Colors.primaryColor100,
                  borderRadius: 12,
                }}></View>
              <GeneralButton onPress={viewHandler}>
                Barang Diterima
              </GeneralButton>
            </>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );

  return <>{modal}</>;
}

export default EOQRModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: DimensionWidth * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  modalForm: {
    width: '100%',
  },
  modalLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.primaryColor,
    marginLeft: 2,
  },
  qrText: {
    marginVertical: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.primaryColor,
  },
});
