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

import Colors from '../../../general/constants/Colors';
import Styles from '../../../general/constants/Styles';
import GeneralFormInput from '../../../general/components/GeneralFormInput';
import GeneralButton from '../../../general/components/GeneralButton';
import GeneralButtonOutline from '../../../general/components/GeneralButtonOutline';
import GeneralPasswordToggle from '../../../general/components/GeneralPasswordToggle';

const DimensionWidth = Dimensions.get('window').width;

function CAMModal({modalVisible, onClose, actionType, viewId, action, view}) {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = React.useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  function passwordVisibilityHandler() {
    if (isPasswordVisible) {
      setIsPasswordVisible(false);
    } else if (!isPasswordVisible) {
      setIsPasswordVisible(true);
    }
  }

  React.useEffect(() => {
    if (modalVisible) {
      setIsVisible(true);
    } else if (!modalVisible) {
      setIsVisible(false);
    }
  }, [modalVisible]);

  function closeHandler() {
    onClose();
  }

  function viewHandler() {
    navigation.navigate('CAMDetail', {
      viewId: viewId,
    });
    console.log(viewId);
    onClose();
  }

  function actionHandler() {
    console.log(actionType);
    onClose();
  }

  const modalView = (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeHandler}>
      <Pressable onPress={closeHandler} style={styles.modalBackground}>
        <Pressable style={[styles.modalContainer, Styles.shadow]}>
          <View style={styles.modalForm}>
            <Text style={styles.modalLabel}>Password</Text>
            <GeneralFormInput
              placeholder="Password"
              textInputConfig={{secureTextEntry: !isPasswordVisible}}
            />
            <View style={styles.toggleContainer}>
              <GeneralPasswordToggle onChange={passwordVisibilityHandler} />
            </View>
            <GeneralButton onPress={viewHandler}>Open</GeneralButton>
            <GeneralButtonOutline onPress={closeHandler}>
              Cancel
            </GeneralButtonOutline>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );

  const modalAction = (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeHandler}>
      <Pressable onPress={closeHandler} style={styles.modalBackground}>
        <Pressable style={[styles.modalContainer, Styles.shadow]}>
          <View style={styles.modalForm}>
            <Text style={styles.modalLabel}>Remarks</Text>
            <GeneralFormInput
              formStyle={
                Platform.OS === 'ios' && {height: 75, paddingVertical: 16}
              }
              placeholder="Give your remarks..."
              textInputConfig={{
                multiline: true,
                numberOfLines: 3,
                textAlignVertical: 'top',
                maxLength: 100,
              }}
            />
            <GeneralButton onPress={actionHandler}>{actionType}</GeneralButton>
            <GeneralButtonOutline onPress={closeHandler}>
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
    marginBottom: 4,
  },
  toggleContainer: {
    alignItems: 'flex-end',
    marginVertical: 8,
  },
});
