import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Dimensions,
  Pressable,
  Platform,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

import Colors from '../../../general/constants/Colors';
import Styles from '../../../general/constants/Styles';
import GeneralFormInput from '../../../general/components/GeneralFormInput';
import GeneralButton from '../../../general/components/GeneralButton';
import GeneralButtonOutline from '../../../general/components/GeneralButtonOutline';
import GeneralLoadingButton from '../../../general/components/GeneralLoadingButton';
import GeneralSecureInput from '../../../general/components/GeneralSecureInput';
import {AuthContext} from '../../../general/context/auth-context';
import {
  ApproveTransactionCAM,
  RejectTransactionCAM,
  ReviseTransactionCAM,
} from '../../utils/CAMAPIMethods';
import {AuthenticationRadius} from '../../../general/utils/APIMethods';
import {CheckRemarks} from '../../utils/CAMHelperMethods';
import PlusJakartaSansText from '../../../../fonts/PlusJakartaSansText';
import PoppinsText from '../../../../fonts/PoppinsText';
import {CheckPassword} from '../../../general/utils/HelperMethods';

const DimensionWidth = Dimensions.get('window').width;

function CAMModal({
  action,
  view,
  modalVisible,
  actionType,
  actionColor,
  viewId,
  viewUrl,
  appsID,
  modulID,
  transactionID,
  onClose,
  onCloseRefresh,
}) {
  const authCtx = React.useContext(AuthContext);
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = React.useState(false);
  const [remarks, setRemarks] = React.useState('');
  const [viewPassword, setViewPassword] = React.useState(null);
  const [wrongPassword, setWrongPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (modalVisible) {
      setIsVisible(true);
    } else if (!modalVisible) {
      setIsVisible(false);
    }
  }, [modalVisible]);

  function closeHandler() {
    setWrongPassword(false);
    onClose();
  }

  function emptyHandler() {}

  async function viewHandler() {
    const checkPassword = await CheckPassword(viewPassword);
    if (checkPassword) {
      Alert.alert('Warning', 'Please enter your password');
      return;
    }
    const response = await AuthenticationRadius(authCtx.UserAD, viewPassword);
    if (response.message === 'Success') {
      AsyncStorage.setItem('radiusPassword', viewPassword.toString());
      const expDateBefore = new Date();
      const expDateAfter = expDateBefore.setHours(expDateBefore.getHours() + 1);
      const expDate = new Date(expDateAfter).toISOString();
      AsyncStorage.setItem('radiusPasswordExp', expDate.toString());
      navigation.navigate('CAMDetail', {
        id: viewId,
        url: viewUrl,
        radiusPassword: viewPassword,
        appID: appsID,
        modulID: modulID,
        isK2: true,
      });
      setWrongPassword(false);
      onClose();
    } else {
      setWrongPassword(true);
    }
  }

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'password':
        setViewPassword(enteredValue);
        break;
      case 'remarks':
        setRemarks(enteredValue);
        break;
      default:
        break;
    }
  }

  const modalView = (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={isLoading ? emptyHandler : closeHandler}>
      <Pressable
        onPress={isLoading ? emptyHandler : closeHandler}
        style={styles.modalBackground}>
        <Pressable style={[styles.modalContainer, Styles.shadow]}>
          <View style={styles.modalForm}>
            <PoppinsText weight="SemiBold" style={styles.modalLabel}>
              Enter your Radius password
            </PoppinsText>
            {wrongPassword && (
              <PoppinsText style={styles.wrongPasswordText}>
                Wrong password, please enter your correct password
              </PoppinsText>
            )}
            <GeneralSecureInput
              containerStyle={{
                borderColor: Colors.CAMPrimary,
                marginVertical: 8,
              }}
              placeholder="Password"
              color={Colors.CAMPrimary}
              onUpdateValue={updateInputValueHandler.bind(this, 'password')}
            />
            <GeneralButton
              onPress={viewHandler}
              buttonStyle={{backgroundColor: Colors.CAMPrimary}}>
              Open
            </GeneralButton>
            <GeneralButtonOutline
              onPress={isLoading ? emptyHandler : closeHandler}
              buttonStyle={{borderColor: Colors.CAMPrimary}}
              textStyle={{color: Colors.CAMPrimary}}>
              Cancel
            </GeneralButtonOutline>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );

  function toastHandler() {
    Toast.show({
      type: 'b7toast',
      text1: 'Success',
      text2: `Successfully ${
        actionType.toLowerCase() == 'reject'
          ? 'rejected'
          : actionType.toLowerCase() + 'd'
      } transaction ${transactionID}`,
      position: 'bottom',
      props: {bgColor: Colors.CAMGreen},
    });
  }

  async function actionHandler() {
    setIsLoading(true);
    if (actionType === 'Approve') {
      const data = {
        username: authCtx.UserAD,
        appsID: appsID,
        modulID: modulID,
        transactionID: transactionID,
      };
      console.log(data);
      const response = await ApproveTransactionCAM(data);
      if (response.Status !== 'DONE') {
        setIsLoading(false);
        return;
      }
    } else if (actionType === 'Reject') {
      const remarksCheck = await CheckRemarks(remarks);
      if (remarksCheck) {
        setIsLoading(false);
        return;
      }
      const data = {
        username: authCtx.UserAD,
        appsID: appsID,
        modulID: modulID,
        transactionID: transactionID,
        rejectReason: remarks,
      };
      const response = await RejectTransactionCAM(data);
      if (response.Status !== 'DONE') {
        setIsLoading(false);
        return;
      }
    } else if (actionType === 'Revise') {
      const remarksCheck = await CheckRemarks(remarks);
      if (remarksCheck) {
        setIsLoading(false);
        return;
      }
      const data = {
        username: authCtx.UserAD,
        appsID: appsID,
        modulID: modulID,
        transactionID: transactionID,
        reviseReason: remarks,
      };
      const response = await ReviseTransactionCAM(data);
      if (response.Status !== 'DONE') {
        setIsLoading(false);
        return;
      }
    }
    setIsLoading(false);
    toastHandler();
    onCloseRefresh();
  }

  const modalAction = (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={isLoading ? emptyHandler : closeHandler}>
      <Pressable
        onPress={isLoading ? emptyHandler : closeHandler}
        style={styles.modalBackground}>
        <Pressable style={[styles.modalContainer, Styles.shadow]}>
          <View style={styles.modalForm}>
            <PoppinsText weight="SemiBold" style={styles.modalLabel}>
              {actionType} transaction?
            </PoppinsText>
            <PoppinsText style={styles.modalDesc}>
              Are you sure you want to {String(actionType).toLowerCase()}{' '}
              selected transaction?{' '}
              {actionType !== 'Approve' && 'Please state your reasoning.'}
            </PoppinsText>
            {actionType !== 'Approve' && (
              <>
                <GeneralFormInput
                  color={actionColor}
                  containerStyle={{marginBottom: 4}}
                  formStyle={[
                    Platform.OS === 'ios' && {
                      height: 75,
                      paddingVertical: 16,
                    },
                    {
                      borderColor: actionColor,
                      borderWidth: 1,
                    },
                  ]}
                  placeholder="Give your remarks..."
                  onUpdateValue={updateInputValueHandler.bind(this, 'remarks')}
                  textInputConfig={{
                    multiline: true,
                    numberOfLines: 3,
                    textAlignVertical: 'top',
                    maxLength: 100,
                  }}
                />
              </>
            )}
            {!isLoading && (
              <GeneralButton
                onPress={actionHandler}
                buttonStyle={{backgroundColor: actionColor}}
                textStyle={{fontWeight: '500'}}>
                {actionType} transaction
              </GeneralButton>
            )}
            {isLoading && (
              <GeneralLoadingButton
                buttonStyle={{backgroundColor: actionColor}}
                title="Updating..."
              />
            )}
            <GeneralButtonOutline
              onPress={isLoading ? emptyHandler : closeHandler}
              buttonStyle={{borderColor: actionColor, borderWidth: 1}}
              textStyle={{color: actionColor, fontWeight: '500'}}>
              Cancel
            </GeneralButtonOutline>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );

  return (
    <>
      {view && modalView}
      {action && modalAction}
    </>
  );
}

export default CAMModal;

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
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  modalForm: {
    width: '100%',
  },
  modalLabel: {
    fontSize: 16,
    color: 'black',
    paddingHorizontal: 2,
    marginBottom: Platform.OS === 'ios' ? 0 : -4,
  },
  wrongPasswordText: {
    fontSize: 12,
    color: Colors.CAMRed,
    paddingHorizontal: 2,
    marginBottom: Platform.OS === 'ios' ? 0 : -2,
  },
  modalDesc: {
    paddingHorizontal: 2,
    marginTop: 4,
    marginBottom: 4,
  },
  toggleContainer: {
    alignItems: 'flex-end',
    marginVertical: 8,
  },
});
