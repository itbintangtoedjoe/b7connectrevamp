import {View, StyleSheet, FlatList} from 'react-native';

import EOItem from './EOItem';

function renderEOItem(data) {
  return (
    <View>
      <EOItem {...data.item} />
    </View>
  );
}

function EOList({data}) {
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{paddingBottom: '5%'}}
        data={data}
        renderItem={renderEOItem}
        style={styles.flatlist}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default EOList;

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
