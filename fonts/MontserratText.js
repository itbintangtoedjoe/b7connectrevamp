import { Text, StyleSheet } from "react-native";

const MontserratText = ({ children, weight, style }) => {
  const validWeights = [
    "Bold",
    "BoldItalic",
    "ExtraBold",
    "ExtraBoldItalic",
    "ExtraLight",
    "ExtraLightItalic",
    "Italic",
    "Light",
    "LightItalic",
    "Medium",
    "MediumItalic",
    "Regular",
    "SemiBold",
    "SemiBoldItalic",
  ];

  const fontWeight = validWeights.includes(weight) ? weight : "Regular";

  const styles = StyleSheet.create({
    text: {
      fontFamily: `Montserrat-${fontWeight}`,
    },
  });

  return <Text style={[styles.text, style]}>{children}</Text>;
};

export default MontserratText;
