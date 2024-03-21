import {StyleSheet, Text, View} from 'react-native';
import Colors from '../constants/Colors';
import PlusJakartaSansText from '../../../fonts/PlusJakartaSansText';
import PoppinsText from '../../../fonts/PoppinsText';
import Strings from '../constants/Strings';

function GeneralCopyright({textStyle}) {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.copyrightContainer}>
        <PoppinsText style={[styles.copyrightText, textStyle]}>
          {`B7 Connect ver ` + Strings.appVersion}
        </PoppinsText>
        <PoppinsText style={[styles.copyrightText, textStyle]}>
          {`Copyright © ` + new Date().getFullYear() + ` PT Bintang Toedjoe`}
        </PoppinsText>
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
