import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
} from "react-native";

import Colors from "../../constants/Colors";
import GeneralIonicons from "../GeneralIonicons";
import GeneralMaterialIcons from "../GeneralMaterialIcons";
import PlusJakartaSansText from "../../../../fonts/PlusJakartaSansText";
import PoppinsText from "../../../../fonts/PoppinsText";

function GeneralApp({
  onPress,
  app,
  appTitle,
  appIcon,
  iconSize,
  appColor,
  appImage,
  materialIcon,
  ionicon,
  iconStyle,
  titleStyle,
}) {
  return (
    <View style={styles.appContainer}>
      {app && (
        <>
          <Pressable
            onPress={onPress}
            style={({ pressed }) => pressed && styles.pressed}
          >
            <View
              style={[
                styles.appIcon,
                iconStyle,
                appColor && { backgroundColor: appColor },
              ]}
            >
              {appImage && (
                <ImageBackground
                  source={appImage}
                  resizeMode="cover"
                  style={{ width: "100%", height: "100%" }}
                ></ImageBackground>
              )}
              {!appImage && ionicon && (
                <GeneralIonicons
                  name={appIcon ? appIcon : "person-circle"}
                  size={32}
                  color={"white"}
                />
              )}
              {!appImage && materialIcon && (
                <GeneralMaterialIcons
                  name={appIcon ? appIcon : "account-circle"}
                  size={32}
                  color={"white"}
                />
              )}
            </View>
          </Pressable>
          <PoppinsText weight="Medium" style={[styles.appTitle, titleStyle]}>
            {appTitle}
          </PoppinsText>
        </>
      )}
    </View>
  );
}

export default GeneralApp;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
  appContainer: {
    //borderWidth: 1,
    height: 90,
    width: 60,
    marginVertical: 6,
    marginHorizontal: "3%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  appIcon: {
    height: 55,
    width: "auto",
    aspectRatio: 1,
    backgroundColor: Colors.primaryColor,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  appTitle: {
    color: "black",
    fontSize: 12,
    textAlign: "center",
    marginTop: 2,
  },
});
