import React from 'react';
import {View, Text, StyleSheet, Pressable, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';
import * as Helper from '../../utils/HelperMethods';
import {SetNotificationIsRead} from '../../utils/APIMethods';
import PlusJakartaSansText from '../../../../fonts/PlusJakartaSansText';
import PoppinsText from '../../../../fonts/PoppinsText';

const DimensionWidth = Dimensions.get('window').width;

const GeneralNotificationItem = React.memo(
  ({
    RecordID,
    Title,
    Body,
    CreationDate,
    UrlMobileRoute,
    TransactionID,
    IsRead,
  }) => {
    const navigation = useNavigation();

    const date = Helper.GetFormattedDateCAM(CreationDate);
    const hour = CreationDate.split(' ')[1];

    async function pressHandler() {
      if (!IsRead) {
        const response = await SetNotificationIsRead(RecordID);
      }

      if (UrlMobileRoute === 'EODeliveryTimeline') {
        navigation.navigate('EO', {
          screen: 'EODetail',
          params: {
            id: TransactionID,
          },
        });
      } else if (UrlMobileRoute === 'CAMDetail') {
        navigation.navigate('CAM', {
          screen: 'CAMDetail',
          params: {
            id: TransactionID,
          },
        });
      } else if (UrlMobileRoute === 'CAMHome') {
        navigation.navigate('CAM', {
          screen: 'CAMHome',
          params: {
            id: TransactionID,
          },
        });
      }
    }

    return (
      <Pressable
        onPress={pressHandler}
        style={({pressed}) => [
          styles.notificationContainer,
          //!IsRead && styles.isReadContainer,
          Styles.shadow,
          pressed && Styles.pressed,
        ]}>
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <PoppinsText
              weight={IsRead ? 'Medium' : 'Bold'}
              style={styles.titleText}>
              {Title}
            </PoppinsText>
            {!IsRead && <View style={styles.unreadDot}></View>}
          </View>
          <PoppinsText style={styles.contentText}>{Body}</PoppinsText>
          <View style={styles.dateContainer}>
            <PoppinsText weight="SemiBold" style={styles.dateText}>
              {date}
            </PoppinsText>
            <PoppinsText weight="SemiBold" style={styles.dateText}>
              {hour}
            </PoppinsText>
          </View>
        </View>
      </Pressable>
    );
  },
);

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
  isReadContainer: {
    borderWidth: 2,
    borderColor: Colors.primaryColor50,
  },
  contentContainer: {
    width: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 16,
    color: Colors.primaryColor,
    flex: 1,
    flexWrap: 'wrap',
    marginBottom: Platform.OS === 'ios' ? 0 : -4,
  },
  contentText: {
    flexWrap: 'wrap',
    //textAlign: "justify",
    color: 'black',
    marginVertical: 6,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateText: {
    flexWrap: 'wrap',
    fontSize: 12,
    //color: "black",
    marginBottom: Platform.OS === 'ios' ? 0 : -4,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: Colors.redAccent,
  },
});
