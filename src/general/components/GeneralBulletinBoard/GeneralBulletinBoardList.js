import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';

import {GeneralBulletinBoardData} from './GeneralBulletinBoardData';
import GeneralBulletinBoardItem from './GeneralBulletinBoardItem';

const DimensionWidth = Dimensions.get('window').width;

function renderBulletinBoardItem(data) {
  return (
    <View>
      <GeneralBulletinBoardItem {...data.item} />
    </View>
  );
}

function GeneralBulletinBoardList() {
  return (
    <View style={styles.rootContainer}>
      <FlatList
        horizontal
        style={styles.flatlist}
        showsHorizontalScrollIndicator={false}
        data={GeneralBulletinBoardData}
        renderItem={renderBulletinBoardItem}
        snapToAlignment={'center'}
        snapToInterval={DimensionWidth}
        disableIntervalMomentum
      />
    </View>
  );
}

export default GeneralBulletinBoardList;

const styles = StyleSheet.create({
  rootContainer: {},
  flatlist: {
    flexGrow: 0,
  },
});
