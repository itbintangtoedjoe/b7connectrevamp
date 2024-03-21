import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

import Colors from "../constants/Colors";
import Styles from "../constants/Styles";

function GeneralLoadingButton({ color, title, buttonStyle }) {
  return (
    <View style={[styles.loadingButton, Styles.shadow, buttonStyle]}>
      <ActivityIndicator size="small" color={color ? color : "white"} />
      <Text style={[styles.loadingText, color && { color: color }]}>
        {title}
      </Text>
    </View>
  );
}

export default GeneralLoadingButton;

const styles = StyleSheet.create({
  loadingButton: {
    flexDirection: "row",
    width: "100%",
    height: 40,
    backgroundColor: Colors.primaryColor,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
  },
  loadingText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
    marginHorizontal: 8,
  },
});
