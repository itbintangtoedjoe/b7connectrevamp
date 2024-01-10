import {View, Text, StyleSheet, Pressable, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';
import * as Helper from '../../utils/HelperMethods';

const DimensionWidth = Dimensions.get('window').width;

function GeneralNotificationItem({Title, TransactionID, CreationDate}) {
  const navigation = useNavigation();
  const tes = '05-12-2023 11:41';
  const date = Helper.GetFormattedDateCAM(CreationDate);
  const hour = CreationDate.split(' ')[1];

  return (
    <Pressable
      style={({pressed}) => [
        styles.notificationContainer,
        Styles.shadow,
        pressed && Styles.pressed,
      ]}>
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>{Title}</Text>
        <Text style={styles.contentText}>
          Transaksi Anda dengan ID Transaksi: {TransactionID} telah Full
          Approved
        </Text>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{date}</Text>
          <Text style={styles.dateText}>{hour}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default GeneralNotificationItem;

const styles = StyleSheet.create({
  notificationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: DimensionWidth * 0.9,
    padding: 12,
    margin: 8,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  contentContainer: {
    width: '100%',
  },
  titleText: {
    fontSize: 16,
    flexWrap: 'wrap',
    fontWeight: 'bold',
    color: Colors.primaryColor,
  },
  contentText: {
    flexWrap: 'wrap',
    textAlign: 'justify',
    color: 'black',
    marginVertical: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateText: {
    flexWrap: 'wrap',
    fontWeight: 'bold',
    fontSize: 12,
    color: 'black',
  },
});
