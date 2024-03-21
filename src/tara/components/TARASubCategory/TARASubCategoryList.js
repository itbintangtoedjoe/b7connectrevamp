import { View, StyleSheet, FlatList } from "react-native";

import TARASubCategoryItem from "./TARASubCategoryItem";

function renderSubCategoryItem(data) {
  return (
    <View>
      <TARASubCategoryItem {...data.item} />
    </View>
  );
}

function TARASubCategoryList({ data }) {
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ paddingBottom: "5%" }}
        data={data.sort((a, b) => a.NamaSubkategori.localeCompare(b.NamaSubkategori))}
        renderItem={renderSubCategoryItem}
        style={styles.flatlist}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default TARASubCategoryList;

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
