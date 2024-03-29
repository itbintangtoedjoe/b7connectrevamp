import React from "react";
import { View, StyleSheet } from "react-native";

import EOList from "./EOContent/EOList";

function EOContent({ data, onRefreshList }) {
  async function onRefresh() {
    onRefreshList();
  }

  return (
    <View style={styles.historyContentContainer}>
      <EOList data={data} onRefreshList={onRefresh} />
    </View>
  );
}

export default EOContent;

const styles = StyleSheet.create({
  historyContentContainer: {
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
