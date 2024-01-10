import {View, StyleSheet, FlatList} from 'react-native';

import GeneralNotificationItem from './GeneralNotificationItem';

function renderNotificationItem(data) {
  return (
    <View>
      <GeneralNotificationItem {...data.item} />
    </View>
  );
}

function GeneralNotificationList({data}) {
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{paddingBottom: '5%'}}
        data={data}
        renderItem={renderNotificationItem}
        style={styles.flatlist}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default GeneralNotificationList;

const styles = StyleSheet.create({
  flatlist: {
    height: '100%',
    flexGrow: 0,
  },
  container: {
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
  },
});
