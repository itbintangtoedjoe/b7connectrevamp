import {View, Text, StyleSheet, Platform} from 'react-native';

import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import GeneralIonicons from './GeneralIonicons';
import PlusJakartaSansText from '../../../fonts/PlusJakartaSansText';
import PoppinsText from '../../../fonts/PoppinsText';

function GeneralPoinBisa() {
  const amount = '';
  return (
    <View style={[styles.walletContainer, Styles.shadow]}>
      <View style={styles.walletAmountContainer}>
        <GeneralIonicons name="wallet" size={28} color={Colors.primaryColor} />
        <View style={{marginLeft: 12}}>
          <PoppinsText weight="Bold" style={styles.poinbisaText}>
            POINBISA
          </PoppinsText>
          {/* <View style={styles.poinbisaDivider}></View> */}
          <PoppinsText style={styles.walletAmountText}>
            {amount ? amount : 'N/A'} {amount ? 'points' : ''}
          </PoppinsText>
        </View>
      </View>
      <View style={styles.walletIconContainer}>
        <GeneralIonicons name="download" size={28} color="grey" />
        <PoppinsText style={styles.walletIconText}>Redeem</PoppinsText>
      </View>
    </View>
  );
}

export default GeneralPoinBisa;

const styles = StyleSheet.create({
  walletContainer: {
    flexDirection: 'row',
    height: 60,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
  },
  walletAmountContainer: {
    flexDirection: 'row',
    height: '100%',
    width: '50%',
    borderRadius: 8,
    alignItems: 'center',
    paddingLeft: 24,
  },
  poinbisaText: {
    color: 'black',
    marginBottom: Platform.OS === 'ios' ? 0 : -4,
  },
  poinbisaDivider: {
    width: 1,
    height: '50%',
    backgroundColor: 'black',
    marginHorizontal: 8,
  },
  walletAmountText: {
    //fontSize: 16,
    color: 'black',
    marginBottom: Platform.OS === 'ios' ? 0 : -2,
  },
  walletIconContainer: {
    //borderWidth: 1,
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 24,
  },
  walletIconText: {
    fontSize: 10,
    color: 'grey',
    textAlign: 'center',
    marginBottom: Platform.OS === 'ios' ? 0 : -2,
  },
});
