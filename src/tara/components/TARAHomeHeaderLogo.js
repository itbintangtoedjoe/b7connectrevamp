import { View, Image, StyleSheet, Dimensions } from "react-native";

const dimensionHeight = Dimensions.get("window").height;

function TARAHomeHeaderLogo() {
  return (
    <View style={styles.headerImgContainer}>
      <Image
        source={require("../assets/TARATARA.png")}
        style={styles.headerImg}
      />
    </View>
  );
}

export default TARAHomeHeaderLogo;

const styles = StyleSheet.create({
  headerImgContainer: {
    width: "auto",
    height: dimensionHeight * 0.1,
    aspectRatio: 2 / 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerImg: {
    width: "100%",
    height: "100%",
  },
});
