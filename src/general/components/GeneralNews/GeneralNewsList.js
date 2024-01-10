import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';

import {GeneralNewsData} from './GeneralNewsData';
import GeneralNewsItem from './GeneralNewsItem';

const DimensionWidth = Dimensions.get('window').width;

function renderNewsItem(data) {
  return (
    <View>
      <GeneralNewsItem {...data.item} />
    </View>
  );
}

function GeneralNewsList() {
  return (
    <View style={styles.rootContainer}>
      <FlatList
        horizontal
        style={styles.flatlist}
        showsHorizontalScrollIndicator={false}
        data={GeneralNewsData}
        renderItem={renderNewsItem}
        snapToAlignment={'center'}
        snapToInterval={DimensionWidth}
        disableIntervalMomentum
      />
    </View>
  );
}

export default GeneralNewsList;

const styles = StyleSheet.create({
  rootContainer: {},
  flatlist: {
    flexGrow: 0,
  },
});
