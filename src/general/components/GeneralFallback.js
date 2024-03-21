import { View, Text, StyleSheet } from "react-native";
import GeneralRefreshButton from "./GeneralRefreshButton";

import Colors from "../constants/Colors";
import PlusJakartaSansText from "../../../fonts/PlusJakartaSansText";
import PoppinsText from "../../../fonts/PoppinsText";

function GeneralFallback({
  fallbackMessage,
  onRefresh,
  textColor,
  refreshColor,
}) {
  return (
    <View style={styles.fallbackContainer}>
      <PoppinsText
        weight="Medium"
        style={[styles.fallbackText, textColor && { color: textColor }]}
      >
        {fallbackMessage ? fallbackMessage : "Fallback Message"}
      </PoppinsText>
      {onRefresh && (
        <GeneralRefreshButton
          onPress={onRefresh}
          color={refreshColor ? refreshColor : "black"}
        />
      )}
    </View>
  );
}

export default GeneralFallback;

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: "black",
  },
});
