import React from "react";
import { Text, View, StyleSheet } from "react-native";
import TARACategoryList from "./TARACategory/TARACategoryList";

function TARACategoryContent({ data }) {
  return (
    <View style={styles.categoryContentContainer}>
      <TARACategoryList data={data} />
    </View>
  );
}

export default TARACategoryContent;

const styles = StyleSheet.create({
  categoryContentContainer: {
    width: "100%",
    flex: 1,
  },
});
