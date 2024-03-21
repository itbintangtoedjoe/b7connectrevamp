import React from "react";
import { View, StyleSheet } from "react-native";

import CAMList from "./CAMContent/CAMList";

function CAMContent({ data, onRefreshList }) {
  async function onRefresh() {
    onRefreshList();
  }

  return (
    <View style={styles.camContentContainer}>
      <CAMList data={data} onRefreshList={onRefresh} />
    </View>
  );
}

export default CAMContent;

const styles = StyleSheet.create({
  camContentContainer: {
    width: "100%",
    flex: 1,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: "black",
  },
});
