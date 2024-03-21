import React, {useEffect, useState} from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  Button,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {Buffer} from 'buffer';

import Colors from '../../general/constants/Colors';
import Styles from '../../general/constants/Styles';
import * as GeneralComponents from '../../general/components/GeneralComponents';
import {AuthContext} from '../../general/context/auth-context';
import PoppinsText from '../../../fonts/PoppinsText';
import CAMModalButton from '../components/CAMContent/CAMModalButton';
import {encrypt, generateRandomIV} from '../../general/utils/Encryption';
import {GetCAMAttachmentUrls} from '../utils/CAMAPIMethods';
import {NetworkErrorHandler} from '../../general/utils/HelperMethods';
import CAMModal from '../components/CAMContent/CAMModal';
import {SafeAreaView} from 'react-native-safe-area-context';

const dimensionWidth = Dimensions.get('window').width;
const dimensionHeight = Dimensions.get('window').height;

function CAMDetailScreen({navigation, route}) {
  const authCtx = React.useContext(AuthContext);
  const itemId = route.params?.id;
  const itemUrl = route.params?.url;
  const appID = route.params?.appID;
  const modulID = route.params?.modulID;
  // const itemUrl =
  //   'https://webportal.bintang7.com/k2attachment/GetFile?p=Invoice/RFP_Lampiran/588532_NSO%20KLB%2024%2001%2000063.pdf&authorization=Basic%20azIuc2VydmljZToxdzNFYUY5bzBAcGY=';
  const radiusPassword = route.params?.radiusPassword;
  const isK2 = route.params?.isK2;
  const encodedString = isK2
    ? 'Basic ' +
      Buffer.from(authCtx.UserAD + ':' + radiusPassword).toString('base64')
    : '';
  const [isLoading, setIsLoading] = React.useState(true);
  const [fallbackMessage, setFallbackMessage] = React.useState(`No data found`);
  const [refresh, setRefresh] = React.useState(false);
  const [attachmentUrl, setAttachmentUrl] = useState(null);
  const [invoiceUrl, setInvoiceUrl] = useState(null);
  const [modalActionVisible, setModalActionVisible] = React.useState(null);
  const [modalActionType, setModalActionType] = React.useState('Action');
  const [modalActionColor, setModalActionColor] = React.useState(
    Colors.CAMPrimary,
  );

  useEffect(() => {
    async function getAttachmentUrls(transID) {
      setIsLoading(true);
      try {
        const response = await GetCAMAttachmentUrls(transID, encodedString);
        setAttachmentUrl(
          response.data.find(link => link.typeDocument == 'Lampiran')
            .downloadLink,
        );
        setInvoiceUrl(
          response.data.find(link => link.typeDocument == 'Invoice')
            .downloadLink,
        );
        setFallbackMessage('No data found');
      } catch (err) {
        const networkResponse = NetworkErrorHandler(err);
        if (networkResponse.length > 0) {
          setFallbackMessage(networkResponse);
        }
      }
      setIsLoading(false);
    }
    getAttachmentUrls(itemId);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');

      Platform.OS === 'android'
        ? StatusBar.setBackgroundColor(Colors.CAMPrimary)
        : undefined;
    }, []),
  );

  async function onRefresh() {
    setRefresh(!refresh);
  }

  let content = (
    <GeneralComponents.Fallback
      fallbackMessage={fallbackMessage}
      onRefresh={onRefresh}
    />
  );

  const viewAttachmentHandler = url => {
    navigation.navigate('CAMAttachment', {
      id: itemId,
      uri: url,
    });
  };

  const modalHandler = async (modalType, actionType, actionColor) => {
    setModalActionType(actionType);
    setModalActionVisible(true);
    setModalActionColor(actionColor);
  };

  function onCloseRefreshHandler() {
    setModalActionVisible(false);
    //onCloseRefresh();
    navigation.navigate('CAMHome', {tes: 'true'});
  }

  const modal = (
    <>
      <CAMModal
        modalVisible={modalActionVisible}
        onClose={() => setModalActionVisible(false)}
        onCloseRefresh={onCloseRefreshHandler}
        action
        actionType={modalActionType}
        actionColor={modalActionColor}
        appsID={appID}
        modulID={modulID}
        transactionID={itemId}
      />
    </>
  );

  return (
    <>
      {modal}
      <StatusBar barStyle="dark-content" backgroundColor={Colors.CAMPrimary} />
      <SafeAreaView style={styles.rootContainer}>
        <GeneralComponents.Header
          title={itemId ? itemId : 'No Transaction Found'}
          containerStyle={
            Platform.OS === 'ios'
              ? {
                  height: 60,
                  backgroundColor: Colors.CAMPrimary,
                  width: '95%',
                  borderRadius: 16,
                }
              : {height: 60, backgroundColor: Colors.CAMPrimary}
          }
          textStyle={{fontSize: 16}}
          backButtonColor="black"
        />
        <View
          style={{
            flex: 1,
            width: '100%',
            marginBottom: '2%',
          }}>
          {itemUrl && encodedString && isK2 && (
            <WebView
              onLoad={() => setIsLoading(false)}
              source={{
                uri: itemUrl,
                headers: {
                  Authorization: encodedString,
                },
                // body: 'Authorization=Basic azIuc2VydmljZToxdzNFYUY5bzBAcGY=',
              }}
              style={{flex: 1}}
            />
          )}
          {itemUrl && !isK2 && (
            <WebView
              onLoad={() => setIsLoading(false)}
              source={{
                uri: itemUrl,
                headers: {
                  Authorization: encodedString,
                },
              }}
              style={{flex: 1}}
            />
          )}
          {!itemUrl && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Error 404: Not Found</Text>
            </View>
          )}
          {isLoading && itemUrl && (
            <View
              style={{
                width: dimensionWidth,
                height: dimensionHeight,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" color={Colors.CAMPrimary} />
              <PoppinsText
                weight="SemiBold"
                style={{color: Colors.CAMPrimary, fontSize: 18, marginTop: 12}}>
                Loading...
              </PoppinsText>
            </View>
          )}
        </View>
        {itemUrl && encodedString && isK2 && !isLoading && attachmentUrl && (
          <View style={styles.buttonContainer2}>
            <View style={styles.attachmentContainer}>
              <CAMModalButton
                materialicon={true}
                onPress={() => viewAttachmentHandler(attachmentUrl)}
                title="View Attachment"
                iconName="attachment"
                iconColor="white"
                containerStyle={{
                  width: '48%',
                  backgroundColor: Colors.CAMDarkerBlue,
                }}
                textStyle={{color: 'white'}}
              />
              <CAMModalButton
                materialicon={true}
                onPress={() => viewAttachmentHandler(invoiceUrl)}
                title="View Invoice"
                iconName="file-document-outline"
                iconColor="white"
                containerStyle={{
                  width: '48%',
                  backgroundColor: Colors.CAMDarkerBlue,
                }}
                textStyle={{color: 'white'}}
              />
            </View>
          </View>
        )}
        {itemUrl && !isLoading && (
          <View style={styles.buttonContainer}>
            <View style={styles.modalButtonContainer}>
              <CAMModalButton
                materialicon={true}
                onPress={() =>
                  modalHandler('Action', 'Approve', Colors.CAMGreen)
                }
                title="Approve"
                iconName="check-bold"
                iconColor="white"
                containerStyle={{
                  width: '32%',
                  backgroundColor: Colors.CAMGreen,
                }}
                textStyle={{color: 'white'}}
              />
              <CAMModalButton
                materialicon={true}
                onPress={() => modalHandler('Action', 'Reject', Colors.CAMRed)}
                title="Reject"
                iconName="close-thick"
                iconColor="white"
                containerStyle={{
                  width: '32%',
                  backgroundColor: Colors.CAMRed,
                }}
                textStyle={{color: 'white'}}
              />
              <CAMModalButton
                materialicon={true}
                onPress={() =>
                  modalHandler('Action', 'Revise', Colors.CAMOrange)
                }
                title="Revise"
                iconName="pen"
                iconColor="white"
                containerStyle={{
                  width: '32%',
                  backgroundColor: Colors.CAMOrange,
                }}
                textStyle={{color: 'white'}}
              />
            </View>
          </View>
        )}
      </SafeAreaView>
    </>
  );
}

export default CAMDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: '2%',
  },
  attachmentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'black',
  },
  buttonContainer: {
    marginHorizontal: '1%',
  },
  buttonContainer2: {
    marginHorizontal: '1%',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});
