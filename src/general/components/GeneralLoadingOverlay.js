import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import Colors from "../constants/Colors";
import PlusJakartaSansText from "../../../fonts/PlusJakartaSansText";
import PoppinsText from "../../../fonts/PoppinsText";

function GeneralLoadingOverlay({
  message,
  loadingColor,
  textStyle,
  containerStyle,
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      <ActivityIndicator
        size="large"
        color={loadingColor ? loadingColor : Colors.primaryColor}
      />
      <PoppinsText
        style={[
          styles.message,
          textStyle,
          loadingColor && { color: loadingColor },
        ]}
      >
        {message}
      </PoppinsText>
    </View>
  );
}

export default GeneralLoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    color: Colors.primaryColor,
    fontSize: 16,
    marginVertical: 12,
  },
});
