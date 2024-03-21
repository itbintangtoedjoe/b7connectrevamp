import { Text, StyleSheet } from "react-native";

const PlusJakartaSansText = ({ children, weight, style, numberOfLines }) => {
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
      fontFamily: `PlusJakartaSans-${fontWeight}`,
      margin: 0,
      padding: 0,
    },
  });

  return (
    <Text
      numberOfLines={numberOfLines ? numberOfLines : undefined}
      style={[styles.text, style]}
    >
      {children}
    </Text>
  );
};

export default PlusJakartaSansText;
