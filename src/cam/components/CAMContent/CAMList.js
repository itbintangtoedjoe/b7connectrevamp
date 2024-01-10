import {View, StyleSheet, FlatList} from 'react-native';

import CAMItem from './CAMItem';

function renderCAMItem(data) {
  return (
    <View>
      <CAMItem {...data.item} />
    </View>
  );
}

function CAMList({data}) {
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{paddingBottom: '5%'}}
        data={data}
        renderItem={renderCAMItem}
        style={styles.flatlist}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default CAMList;

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
