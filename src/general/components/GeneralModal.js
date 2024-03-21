import React from "react";
import { StyleSheet, View, Modal, Dimensions, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Colors from "../../general/constants/Colors";
import Styles from "../../general/constants/Styles";
import GeneralButton from "./GeneralButton";
import GeneralButtonOutline from "./GeneralButtonOutline";
import PoppinsText from "../../../fonts/PoppinsText";
import { AuthContext } from "../context/auth-context";

const DimensionWidth = Dimensions.get("window").width;

function GeneralModal({ modalVisible, onClose, onConfirm }) {
  const authCtx = React.useContext(AuthContext);
  const [isVisible, setIsVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const navigation = useNavigation();

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

  function confirmHandler() {
    onConfirm();
  }

  function emptyHandler() {}

  const modal = (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeHandler}
    >
      <Pressable onPress={closeHandler} style={styles.modalBackground}>
        <Pressable style={[styles.modalContainer, Styles.shadow]}>
          <View style={styles.modalForm}>
            <PoppinsText style={styles.modalLabel}>
              Are you sure you want to sign out from this account?
            </PoppinsText>
            <GeneralButton
              onPress={confirmHandler}
              buttonStyle={{
                backgroundColor: Colors.redAccent,
              }}
            >
              Sign out
            </GeneralButton>
            <GeneralButtonOutline
              onPress={closeHandler}
              buttonStyle={{
                borderColor: Colors.redAccent,
              }}
              textStyle={{ color: Colors.redAccent }}
            >
              Cancel
            </GeneralButtonOutline>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );

  return <>{modal}</>;
}

export default GeneralModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: DimensionWidth * 0.9,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: "white",
  },
  modalLabel: {
    fontSize: 16,
    color: "black",
    paddingHorizontal: 2,
  },
  modalForm: {
    width: "100%",
  },
});
