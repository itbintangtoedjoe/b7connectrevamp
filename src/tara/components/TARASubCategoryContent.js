import React from "react";
import { Text, View, StyleSheet } from "react-native";
import TARASubCategoryList from "./TARASubCategory/TARASubCategoryList";

function TARASubCategoryContent({ data }) {
  return (
    <View style={styles.categoryContentContainer}>
      <TARASubCategoryList data={data} />
    </View>
  );
}

export default TARASubCategoryContent;

const styles = StyleSheet.create({
  categoryContentContainer: {
    width: "100%",
    flex: 1,
  },
});
