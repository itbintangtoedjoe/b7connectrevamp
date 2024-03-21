import React from "react";
import { View, StyleSheet, FlatList, RefreshControl } from "react-native";

import TARADocumentItem from "./TARADocumentItem";
import Colors from "../../../general/constants/Colors";

function renderDocumentItem(data) {
  return (
    <View>
      <TARADocumentItem {...data.item} />
    </View>
  );
}

function TARADocumentList({ data, onRefreshList }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    onRefreshList();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ paddingBottom: "5%" }}
        data={data.sort((a, b) => a.Judul.localeCompare(b.Judul))}
        renderItem={renderDocumentItem}
        style={styles.flatlist}
        showsVerticalScrollIndicator={false}
        windowSize={10}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.TARAPrimary]}
          />
        }
      />
    </View>
  );
}

export default TARADocumentList;

const styles = StyleSheet.create({
  flatlist: {
    height: "100%",
    flexGrow: 0,
  },
  container: {
    width: "100%",
    alignItems: "center",
    marginTop: 8,
  },
});
