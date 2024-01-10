import {View, Text, StyleSheet} from 'react-native';

import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import GeneralIonicons from './GeneralIonicons';

function GeneralPoinBisa() {
  const amount = '';
  return (
    <View style={[styles.walletContainer, Styles.shadow]}>
      <View style={styles.walletAmountContainer}>
        <GeneralIonicons name="wallet" size={28} color={Colors.primaryColor} />
        <View style={{marginLeft: 12}}>
          <Text style={styles.poinbisaText}>POINBISA</Text>
          {/* <View style={styles.poinbisaDivider}></View> */}
          <Text style={styles.walletAmountText}>
            {amount ? amount : 'N/A'} {amount ? 'points' : ''}
          </Text>
        </View>
      </View>
      <View style={styles.walletIconContainer}>
        <GeneralIonicons name="download" size={28} color="grey" />
        <Text style={styles.walletIconText}>Redeem</Text>
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
    //borderWidth: 1,
    fontWeight: 'bold',
    //fontSize: 16,
    color: 'black',
  },
  poinbisaDivider: {
    width: 1,
    height: '50%',
    backgroundColor: 'black',
    marginHorizontal: 8,
  },
  walletAmountText: {
    //borderWidth: 1,
    //fontWeight: 'bold',
    //fontSize: 16,
    color: 'black',
  },
  walletIconContainer: {
    //borderWidth: 1,
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 24,
  },
  walletIconText: {
    fontWeight: 'bold',
    fontSize: 10,
    color: 'grey',
    textAlign: 'center',
  },
});
