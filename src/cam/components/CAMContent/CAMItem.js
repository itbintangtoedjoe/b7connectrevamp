import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Colors from '../../../general/constants/Colors';
import Styles from '../../../general/constants/Styles';
import {GetFormattedName} from '../../../general/utils/HelperMethods';
import CAMModalButton from './CAMModalButton';
import CAMModal from './CAMModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PlusJakartaSansText from '../../../../fonts/PlusJakartaSansText';
import PoppinsText from '../../../../fonts/PoppinsText';

const DimensionWidth = Dimensions.get('window').width;

const CAMItem = React.memo(
  ({
    APPSNAME,
    URLMobile,
    IDTRANSC,
    TRANSACTIONDATE,
    REQUESTOR,
    REMARKS,
    IDAPPS_FK,
    MODULID_FK,
    onCloseRefresh,
    ISK2,
  }) => {
    const [isClicked, setIsClicked] = React.useState(false);
    const [modalViewVisible, setModalViewVisible] = React.useState(null);
    const [modalActionVisible, setModalActionVisible] = React.useState(null);
    const [modalActionType, setModalActionType] = React.useState('Action');
    const [modalActionColor, setModalActionColor] = React.useState(
      Colors.CAMPrimary,
    );

    const navigation = useNavigation();

    function clickHandler() {
      setIsClicked(!isClicked);
    }

    const modalHandler = async (modalType, actionType, actionColor) => {
      const radiusPassword = await AsyncStorage.getItem('radiusPassword');
      const radiusPasswordExp = await AsyncStorage.getItem('radiusPasswordExp');
      if (modalType === 'View') {
        if (!ISK2) {
          navigation.navigate('CAMDetail', {
            id: IDTRANSC,
            modulID: MODULID_FK,
            appID: IDAPPS_FK,
            url: URLMobile,
            isK2: false,
          });
          return;
        }
        if (radiusPassword && new Date(radiusPasswordExp) >= new Date()) {
          // console.log(new Date(radiusPasswordExp), new Date());
          navigation.navigate('CAMDetail', {
            id: IDTRANSC,
            modulID: MODULID_FK,
            appID: IDAPPS_FK,
            url: URLMobile,
            radiusPassword: radiusPassword,
            isK2: true,
          });
        } else {
          AsyncStorage.removeItem('radiusPassword');
          AsyncStorage.removeItem('radiusPasswordExp');
          setModalViewVisible(true);
        }
      } else if (modalType === 'Action') {
        setModalActionType(actionType);
        setModalActionVisible(true);
        setModalActionColor(actionColor);
      }
    };

    const ContentDetail = ({title, desc, weight, descStyle}) => {
      return (
        <View style={styles.contentContainer}>
          <PoppinsText weight="Regular" style={styles.titleText}>
            {title}
          </PoppinsText>
          <PoppinsText
            weight={weight ? weight : 'Regular'}
            style={[styles.descText, descStyle]}>
            {desc}
          </PoppinsText>
        </View>
      );
    };

    function onCloseRefreshHandler() {
      setModalViewVisible(false);
      setModalActionVisible(false);
      onCloseRefresh();
    }

    const modal = (
      <>
        <CAMModal
          modalVisible={modalViewVisible}
          onClose={() => setModalViewVisible(false)}
          view
          appsID={IDAPPS_FK}
          modulID={MODULID_FK}
          viewId={IDTRANSC}
          viewUrl={URLMobile}
        />
        <CAMModal
          modalVisible={modalActionVisible}
          onClose={() => setModalActionVisible(false)}
          onCloseRefresh={onCloseRefreshHandler}
          action
          actionType={modalActionType}
          actionColor={modalActionColor}
          appsID={IDAPPS_FK}
          modulID={MODULID_FK}
          transactionID={IDTRANSC}
        />
      </>
    );

    const ContentRemarks = () => {
      return (
        <View style={styles.remarksContainer}>
          <PoppinsText weight="SemiBold" style={styles.remarksTitle}>
            Remarks
          </PoppinsText>
          <PoppinsText
            numberOfLines={isClicked ? 2 : 1}
            style={styles.remarksDesc}>
            {REMARKS}
          </PoppinsText>
        </View>
      );
    };

    return (
      <>
        {modal}
        <View style={[styles.outContainer, Styles.shadow]}>
          <Pressable
            onPress={clickHandler}
            style={({pressed}) => [
              styles.rootContainer,
              Styles.shadow,
              pressed && Styles.pressed,
            ]}>
            <ContentDetail title="Application" desc={APPSNAME} />
            <ContentDetail title="Transaction Number" desc={IDTRANSC} />
            <ContentDetail title="Transaction Date" desc={TRANSACTIONDATE} />
            <ContentDetail
              weight="SemiBold"
              descStyle={{marginBottom: Platform.OS === 'ios' ? 0 : -2}}
              title="Requester"
              desc={REQUESTOR ? GetFormattedName(REQUESTOR) : '-'}
            />
          </Pressable>
          <ContentRemarks />
          {isClicked && (
            <View style={styles.buttonContainer}>
              <CAMModalButton
                onPress={() => modalHandler('View')}
                title="View"
                iconName="search"
                iconColor={Colors.CAMPrimary}
                containerStyle={{backgroundColor: 'white'}}
                textStyle={{
                  marginHorizontal: 12,
                  marginBottom: Platform.OS === 'ios' ? 0 : -4,
                  fontSize: 16,
                  color: Colors.CAMPrimary,
                }}
              />
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
                    width: '30%',
                    backgroundColor: Colors.CAMGreen,
                  }}
                  textStyle={{color: 'white'}}
                />
                <CAMModalButton
                  materialicon={true}
                  onPress={() =>
                    modalHandler('Action', 'Reject', Colors.CAMRed)
                  }
                  title="Reject"
                  iconName="close-thick"
                  iconColor="white"
                  containerStyle={{
                    width: '30%',
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
                    width: '30%',
                    backgroundColor: Colors.CAMOrange,
                  }}
                  textStyle={{color: 'white'}}
                />
              </View>
            </View>
          )}
        </View>
      </>
    );
  },
);

export default CAMItem;

const styles = StyleSheet.create({
  outContainer: {
    width: DimensionWidth * 0.9,
    margin: 8,
    borderRadius: 12,
    backgroundColor: Colors.CAMPrimary,
  },
  rootContainer: {
    width: '100%',
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  remarksContainer: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 10,
  },
  titleText: {
    flex: 3,
    fontSize: 12,
    color: 'grey',
    marginBottom: Platform.OS === 'ios' ? 0 : -2,
  },
  descText: {
    flex: 4,
    fontSize: 12,
    color: 'black',
    flexWrap: 'wrap',
    textAlign: 'right',
    marginBottom: Platform.OS === 'ios' ? 0 : -2,
  },
  buttonContainer: {
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  remarksTitle: {
    flex: 3,
    fontSize: 12,
    color: 'black',
    marginBottom: Platform.OS === 'ios' ? 0 : -2,
  },
  remarksDesc: {
    flex: 4,
    flexWrap: 'wrap',
    textAlign: 'right',
    fontSize: 12,
    textAlign: 'left',
    color: 'black',
    marginBottom: Platform.OS === 'ios' ? 0 : -2,
  },
});
