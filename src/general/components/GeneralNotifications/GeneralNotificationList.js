import React from "react";
import {
  View,
  StyleSheet,
  RefreshControl,
  VirtualizedList,
} from "react-native";

import GeneralNotificationItem from "./GeneralNotificationItem";
import Colors from "../../../general/constants/Colors";

function GeneralNotificationList({ data, onRefreshList }) {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    onRefreshList();
  }, []);

  const keyExtractor = (_, index) => index.toString();

  const getItem = (_, index) => data[index];

  const getItemCount = () => data.length;

  const NotificationItemMemoized = React.memo(GeneralNotificationItem);

  const renderNotificationItem = ({ item, index }) => (
    <View>
      <NotificationItemMemoized {...item} onCloseRefresh={onRefresh} />
    </View>
  );

  return (
    <View style={styles.container}>
      <VirtualizedList
        contentContainerStyle={{ paddingBottom: "5%" }}
        style={styles.flatlist}
        data={data}
        renderItem={renderNotificationItem}
        keyExtractor={keyExtractor}
        getItemCount={getItemCount}
        getItem={getItem}
        initialNumToRender={20}
        maxToRenderPerBatch={10}
        windowSize={5}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.CAMPrimary]}
          />
        }
      />
    </View>
  );
}

export default GeneralNotificationList;

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
