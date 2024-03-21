import {Text, StyleSheet} from 'react-native';

const PoppinsText = ({children, weight, style, numberOfLines, onPress}) => {
  const validWeights = [
    'Black',
    'BlackItalic',
    'Bold',
    'BoldItalic',
    'ExtraBold',
    'ExtraBoldItalic',
    'ExtraLight',
    'ExtraLightItalic',
    'Italic',
    'Light',
    'LightItalic',
    'Medium',
    'MediumItalic',
    'MediumItalic',
    'Regular',
    'SemiBold',
    'SemiBoldItalic',
    'Thin',
    'ThinItalic',
  ];

  const fontWeight = validWeights.includes(weight) ? weight : 'Regular';

  const styles = StyleSheet.create({
    text: {
      fontFamily: `Poppins-${fontWeight}`,
    },
  });

  return (
    <Text
      numberOfLines={numberOfLines ? numberOfLines : undefined}
      style={[styles.text, style]}
      onPress={onPress}>
      {children}
    </Text>
  );
};

export default PoppinsText;
