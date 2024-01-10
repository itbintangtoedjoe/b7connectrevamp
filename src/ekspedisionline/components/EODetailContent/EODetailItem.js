import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import Colors from '../../../general/constants/Colors';
import Styles from '../../../general/constants/Styles';
import {
  GetFormattedDateEO,
  GetFormattedHourEO,
} from '../../utils/EOHelperMethods';
import {MaterialIcons} from '../../../general/components/GeneralComponents';

const dimensionWidth = Dimensions.get('window').width;

function EODetailItem({
  DetailStatus,
  ID,
  IDPengiriman,
  IDPetugas,
  NamaPetugas,
  Status,
  UpdatedOn,
  itemIndex,
  maxIndex,
}) {
  const date = GetFormattedDateEO(UpdatedOn);
  const hour = GetFormattedHourEO(UpdatedOn);

  let content = (
    <View style={styles.container}>
      <View style={styles.dateCard}>
        <View style={[styles.dateCardIn, Styles.shadow]}>
          <Text style={[styles.dateText, {marginBottom: 2, fontWeight: '800'}]}>
            {date}
          </Text>
          <Text style={styles.dateText}>{hour}</Text>
        </View>
      </View>

      <View style={styles.timelineCard}>
        <View
          style={[
            styles.timelinePoint,
            itemIndex == 0 && maxIndex > 0 && {backgroundColor: 'green'},
            itemIndex == maxIndex && maxIndex > 0 && {backgroundColor: 'blue'},
            itemIndex == 0 && maxIndex == 0 && {backgroundColor: 'red'},
          ]}></View>
        {parseInt(itemIndex) < maxIndex && (
          <View style={styles.timelineLine}></View>
        )}
      </View>

      <View style={styles.detailCard}>
        <View style={[styles.detailCardIn, Styles.shadow]}>
          <Text
            style={[styles.detailText, {fontWeight: '800', marginBottom: 2}]}>
            {Status}
          </Text>
          <Text style={styles.detailText}>{DetailStatus}</Text>
        </View>
      </View>
    </View>
  );

  return <View style={styles.pressable}>{content}</View>;
}

export default React.memo(EODetailItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: dimensionWidth * 0.9,
    justifyContent: 'space-between',
    marginHorizontal: 8,
  },
  dateCard: {
    width: '22%',
    height: '100%',
  },
  dateCardIn: {
    width: '100%',
    backgroundColor: Colors.primaryColor,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 4,
    alignItems: 'center',
  },
  dateText: {
    fontWeight: '500',
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
  timelineCard: {
    width: '10%',
    height: '100%',
    alignItems: 'center',
  },
  timelinePoint: {
    width: '35%',
    height: 'auto',
    aspectRatio: 1,
    backgroundColor: Colors.primaryColor,
    borderRadius: 100,
  },
  timelineLine: {
    flex: 1,
    width: '7%',
    backgroundColor: Colors.primaryColor50,
  },
  detailCard: {
    width: '68%',
    height: '100%',
  },
  detailCardIn: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 32,
  },
  detailText: {
    color: Colors.primaryColor,
  },
});
