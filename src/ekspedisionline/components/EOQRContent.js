import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  Keyboard,
  StatusBar,
  Platform,
} from 'react-native';
import Toast from 'react-native-toast-message';

import Colors from '../../general/constants/Colors';
import Styles from '../../general/constants/Styles';
import GeneralButton from '../../general/components/GeneralButton';
import {updateDeliveryStatusEO} from '../utils/EOAPIMethods';
import {
  NetworkErrorHandler,
  GetFormattedName,
} from '../../general/utils/HelperMethods';
import GeneralLoadingButton from '../../general/components/GeneralLoadingButton';
import {AuthContext} from '../../general/context/auth-context';
import PlusJakartaSansText from '../../../fonts/PlusJakartaSansText';
import PoppinsText from '../../../fonts/PoppinsText';
import GeneralFormInput from '../../general/components/GeneralFormInput';

const dimensionWidth = Dimensions.get('window').width;

function EOQRContent({data, actionType, onClose}) {
  const authCtx = React.useContext(AuthContext);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = React.useState(false);
  const [jenisPenerimaan, setjenisPenerimaan] = React.useState('Perantara');
  const [keterangan, setKeterangan] = React.useState('');
  const [isClickedPerantara, setIsClickedPerantara] = React.useState(true);
  const [isClickedPerwakilan, setIsClickedPerwakilan] = React.useState(false);

  React.useEffect(() => {
    if (actionType === 'TerimaPetugas' && authCtx.EONamaRole === 'Driver') {
      setjenisPenerimaan('Perwakilan Driver');
    }
    if (actionType === 'TerimaPetugas' && authCtx.EONamaRole !== 'Driver') {
    }
  }, []);

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardOpen(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardOpen(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [isKeyboardOpen]);

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'keterangan':
        setKeterangan(enteredValue);
        break;
      default:
        break;
    }
  }

  let content = (
    <PoppinsText weight="SemiBold" style={styles.fallbackText}>
      {data === 'not found'
        ? 'Pengiriman dengan nomor resi tersebut tidak ditemukan'
        : 'Pengiriman dengan nomor resi tersebut sudah tidak aktif'}
    </PoppinsText>
  );

  const ActorItem = ({title, name, location}) => {
    return (
      <View style={styles.contentContainer}>
        <PoppinsText weight="Bold" style={styles.contentTitle}>
          {title}
        </PoppinsText>
        <PoppinsText style={styles.contentText}>Nama: {name}</PoppinsText>
        <PoppinsText style={styles.contentText}>Lokasi: {location}</PoppinsText>
      </View>
    );
  };

  const ContentItem = ({title, desc}) => {
    return (
      <View style={styles.contentContainer}>
        <PoppinsText weight="Bold" style={styles.contentTitle}>
          {title}:{'  '}
          <PoppinsText style={styles.contentText}>{desc}</PoppinsText>
        </PoppinsText>
      </View>
    );
  };

  const perwakilanContent = (
    <View>
      <PoppinsText
        weight="Bold"
        style={[styles.contentTitle, {marginBottom: 2, paddingHorizontal: 2}]}>
        Penerimaan barang sebagai admin:
      </PoppinsText>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <GeneralButton
          onPress={perantaraClickHandler}
          buttonStyle={{
            width: '48%',
            height: 50,
            backgroundColor: isClickedPerantara
              ? Colors.EOPrimary200
              : 'lightgrey',
          }}>
          Perantara
        </GeneralButton>
        <GeneralButton
          onPress={perwakilanClickHandler}
          buttonStyle={{
            width: '48%',
            height: 50,
            backgroundColor: isClickedPerwakilan
              ? Colors.EOPrimary200
              : 'lightgrey',
          }}>
          Perwakilan
        </GeneralButton>
      </View>
    </View>
  );

  if (data !== 'not found' && data !== 'completed delivery') {
    content = (
      <View>
        <ActorItem
          title="Pengirim"
          name={
            data.NamaPengirim ? GetFormattedName(data.NamaPengirim) : 'Nama'
          }
          location={data.LokasiPengirim ? data.LokasiPengirim : 'Lokasi'}
        />
        <ActorItem
          title="Penerima"
          name={
            data.NamaPenerima ? GetFormattedName(data.NamaPenerima) : 'Nama'
          }
          location={
            data.LokasiPenerima ? GetFormattedName(data.LokasiPenerima) : 'Nama'
          }
        />
        <ContentItem
          title="Jenis Barang"
          desc={
            data.JenisBarang ? GetFormattedName(data.JenisBarang) : 'Barang'
          }
        />
        <ContentItem
          title="Keterangan"
          desc={
            data.Keterangan ? GetFormattedName(data.Keterangan) : 'Keterangan'
          }
        />
        <ContentItem
          title="Status Terakhir"
          desc={data.DetailStatus ? data.DetailStatus : 'Status'}
        />
      </View>
    );
  }

  const closedContent = (
    <PoppinsText
      weight="Medium"
      style={{
        marginBottom: Platform.OS === 'ios' ? 0 : -4,
        textAlign: 'center',
      }}>
      Close the keyboard to view details
    </PoppinsText>
  );

  async function perantaraClickHandler() {
    setjenisPenerimaan('Perantara');
    setIsClickedPerantara(true);
    setIsClickedPerwakilan(false);
  }

  async function perwakilanClickHandler() {
    setjenisPenerimaan('Perwakilan');
    setIsClickedPerantara(false);
    setIsClickedPerwakilan(true);
  }

  function toastHandler() {
    Toast.show({
      type: 'b7toast',
      text1: 'Berhasil',
      text2: 'Status barang berhasil terupdate',
      position: 'bottom',
      props: {bgColor: Colors.CAMGreen},
    });
  }

  async function updateDeliveryStatusHandler() {
    setIsUpdating(true);

    if (jenisPenerimaan === 'Perwakilan' && keterangan.length < 5) {
      setIsUpdating(false);
      Alert.alert('Gagal', 'Alasan perwakilan minimal 5 karakter');
      return;
    }
    if (jenisPenerimaan === 'Perwakilan Driver' && keterangan.length < 3) {
      setIsUpdating(false);
      Alert.alert(
        'Gagal',
        'Mohon masukkan nama penerima yang benar (minimal 3 karakter)',
      );
      return;
    }

    try {
      const response = await updateDeliveryStatusEO(
        data.ID,
        authCtx.EONIK,
        jenisPenerimaan,
        keterangan,
      );
      if (response.data === 'success') {
        setIsUpdating(false);
        toastHandler();
        onClose();
      }
    } catch (err) {
      setIsUpdating(false);
      NetworkErrorHandler(err);
    }
    setIsUpdating(false);
  }

  function closeHandler() {
    setIsUpdating(false);
    setKeterangan('');
    setjenisPenerimaan('');
    onClose();
  }

  function emptyHandler() {}

  function noAuthHandler() {
    Alert.alert(
      'Gagal',
      'Anda tidak memiliki otorisasi untuk mengubah status pengiriman dengan resi ini',
    );
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.resiContainer}>
        <PoppinsText weight="Bold" style={styles.resiTitleText}>
          Nomor Resi
        </PoppinsText>
        <PoppinsText weight="Medium" style={styles.resiValueText}>
          {data.ResiBarang ? data.ResiBarang : 'Tidak menemukan resi barang'}
        </PoppinsText>
      </View>

      <View style={[styles.searchResultContainer, Styles.shadow]}>
        {isKeyboardOpen ? closedContent : content}
      </View>

      {data !== 'not found' &&
        data !== 'completed delivery' &&
        (actionType === 'TerimaKaryawan' &&
        authCtx.EONIK !== data.NIKPenerima &&
        authCtx.EONIK === data.NIKAdminPenerima.trim() ? (
          <View
            style={[
              styles.searchResultContainer,
              Styles.shadow,
              {marginTop: 12, paddingVertical: 8, paddingHorizontal: 12},
            ]}>
            {perwakilanContent}
          </View>
        ) : null)}

      <View style={styles.buttonContainer}>
        {data !== 'not found' &&
          data !== 'completed delivery' &&
          !isUpdating && (
            <>
              {jenisPenerimaan === 'Perwakilan Driver' ? (
                <GeneralFormInput
                  color={Colors.EOPrimary200}
                  label="Masukkan nama penerima"
                  placeholder="Nama penerima..."
                  textInputConfig={{
                    numberOfLines: 2,
                    textAlignVertical: 'top',
                  }}
                  onUpdateValue={updateInputValueHandler.bind(
                    this,
                    'keterangan',
                  )}
                />
              ) : undefined}
              {jenisPenerimaan === 'Perwakilan' ? (
                <GeneralFormInput
                  color={Colors.EOPrimary200}
                  label="Masukkan alasan yang jelas"
                  placeholder="Alasan..."
                  textInputConfig={{
                    numberOfLines: 2,
                    textAlignVertical: 'top',
                  }}
                  onUpdateValue={updateInputValueHandler.bind(
                    this,
                    'keterangan',
                  )}
                />
              ) : undefined}

              {actionType === 'TerimaKaryawan' &&
                (authCtx.EONIK === data.NIKAdminPenerima.trim() ||
                authCtx.EONIK === data.NIKPenerima ? (
                  <GeneralButton
                    onPress={
                      !isUpdating ? updateDeliveryStatusHandler : emptyHandler
                    }
                    buttonStyle={{
                      marginVertical: 8,
                      backgroundColor: Colors.EOPrimary200,
                    }}>
                    Barang diterima
                  </GeneralButton>
                ) : (
                  <GeneralButton
                    //onPress={noAuthHandler}
                    unpressable
                    buttonStyle={{
                      marginVertical: 8,
                      backgroundColor: Colors.EOPrimary300,
                    }}>
                    Anda tidak memiliki otorisasi
                  </GeneralButton>
                ))}

              {actionType !== 'TerimaKaryawan' && (
                <GeneralButton
                  onPress={
                    !isUpdating ? updateDeliveryStatusHandler : emptyHandler
                  }
                  buttonStyle={{
                    marginVertical: 8,
                    backgroundColor: Colors.EOPrimary200,
                  }}>
                  {actionType === 'KirimPetugas'
                    ? 'Kirim barang'
                    : 'Barang diterima'}
                </GeneralButton>
              )}
            </>
          )}
        {data !== 'not found' &&
          data !== 'completed delivery' &&
          isUpdating && (
            <GeneralLoadingButton
              buttonStyle={{backgroundColor: Colors.EOPrimary200}}
              title="Updating..."
            />
          )}
        <GeneralButton
          onPress={!isUpdating ? closeHandler : emptyHandler}
          buttonStyle={{backgroundColor: 'black'}}>
          Scan ulang
        </GeneralButton>
      </View>
    </View>
  );
}

export default EOQRContent;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.EOPrimary100,
  },
  resiContainer: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  resiTitleText: {
    fontSize: 24,
    color: 'white',
    marginBottom: Platform.OS === 'ios' ? 0 : -4,
  },
  resiValueText: {
    fontSize: 20,
    color: 'white',
    marginBottom: Platform.OS === 'ios' ? 0 : -4,
  },
  searchResultContainer: {
    width: dimensionWidth * 0.9,
    alignSelf: 'center',
    marginTop: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  searchResultText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
    color: 'black',
  },
  fallbackText: {},
  contentContainer: {
    marginVertical: 4,
  },
  contentTitle: {
    color: 'black',
    marginBottom: Platform.OS === 'ios' ? 0 : -2,
  },
  contentText: {
    color: 'black',
    marginBottom: Platform.OS === 'ios' ? 0 : -2,
  },
  buttonContainer: {
    width: dimensionWidth * 0.9,
    marginVertical: 12,
    alignSelf: 'center',
  },
  buttonClicked: {},
  buttonNotClicked: {},
});
