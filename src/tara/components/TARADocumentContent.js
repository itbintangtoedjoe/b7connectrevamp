import React from "react";
import { View, StyleSheet } from "react-native";

import TARADocumentList from "./TARADocument/TARADocumentList";

function TARADocumentContent({ data, onRefreshList }) {
  async function onRefresh() {
    onRefreshList();
  }
  
  return (
    <View style={styles.categoryContentContainer}>
      <TARADocumentList data={data} onRefreshList={onRefresh} />
    </View>
  );
}

export default TARADocumentContent;

const styles = StyleSheet.create({
  categoryContentContainer: {
    width: "100%",
    flex: 1,
  },
});
