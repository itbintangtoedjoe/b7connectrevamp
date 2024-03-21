import { View, StyleSheet, FlatList } from "react-native";

import TARACategoryItem from "./TARACategoryItem";

function renderCategoryItem(data) {
  return (
    <View>
      <TARACategoryItem {...data.item} />
    </View>
  );
}

function TARACategoryList({ data }) {
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ paddingBottom: "5%" }}
        data={data.sort((a, b) => a.NamaKategori.localeCompare(b.NamaKategori))}
        renderItem={renderCategoryItem}
        style={styles.flatlist}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default TARACategoryList;

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
