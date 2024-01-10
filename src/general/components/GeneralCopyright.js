import {StyleSheet, Text, View} from 'react-native';
import Colors from '../constants/Colors';

function GeneralCopyright({textStyle}) {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.copyrightContainer}>
        <Text
          style={[
            styles.copyrightText,
            textStyle,
          ]}>{`B7 Connect ver 1.1.3\nCopyright © 2023 PT Bintang Toedjoe`}</Text>
      </View>
    </View>
  );
}

export default GeneralCopyright;

const styles = StyleSheet.create({
  rootContainer: {},
  copyrightContainer: {},
  copyrightText: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.primaryColor,
  },
});
