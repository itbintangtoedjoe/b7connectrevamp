import React from "react";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Colors from "../../../general/constants/Colors";
import Styles from "../../../general/constants/Styles";
import GeneralIonicons from "../../../general/components/GeneralIonicons";
import GeneralMaterialIcons from "../../../general/components/GeneralMaterialIcons";
import PlusJakartaSansText from "../../../../fonts/PlusJakartaSansText";
import PoppinsText from "../../../../fonts/PoppinsText";

const dimensionWidth = Dimensions.get("window").width;

function TARADocumentItem({ Judul, Deskripsi, AccessiblePath }) {
  const navigation = useNavigation();

  let content = (
    <>
      <View style={styles.container}>
        <View style={styles.filetypeContainer}>
          <GeneralMaterialIcons name="file-pdf-box" size={48} color="white" />
        </View>
        <View style={styles.detailContainer}>
          <PoppinsText weight="Bold" style={styles.titleText} numberOfLines={3}>
            {Judul}
          </PoppinsText>
          <PoppinsText style={styles.descText} numberOfLines={3}>
            {Deskripsi}
          </PoppinsText>
        </View>
      </View>
    </>
  );

  function DetailHandler() {
    navigation.navigate("TARADocumentViewer", {
      uri: AccessiblePath,
      title: Judul,
    });
  }

  return (
    <Pressable
      onPress={DetailHandler}
      style={({ pressed }) => [
        styles.itemContainer,
        Styles.shadow,
        pressed && Styles.pressed,
      ]}
    >
      {content}
    </Pressable>
  );
}

export default React.memo(TARADocumentItem);

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    margin: 8,
  },
  container: {
    flexDirection: "row",
    width: dimensionWidth * 0.9,
    height: 160,
    justifyContent: "space-between",
    borderWidth: 2,
    borderRadius: 12,
    borderColor: Colors.primaryColor50,
    backgroundColor: "white",
  },
  filetypeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryColor50,
    borderTopStartRadius: 8,
    borderBottomStartRadius: 8,
  },
  detailContainer: {
    flex: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  titleText: {
    flex: 1,
    fontSize: 16,
    color: Colors.primaryColor50,
  },
  descText: {
    flex: 1,
    color: "black",
    textAlign: "left",
  },
});
