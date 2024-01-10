import React from 'react';
import {Text, View, StyleSheet, FlatList, ScrollView} from 'react-native';

import EODetailItem from './EODetailItem';

// function renderEODetailItem(item, maxIndex) {
//   return (
//     <View>
//       <EODetailItem {...item.item} maxIndex={maxIndex} />
//     </View>
//   );
// }

function EODetailList({data}) {
  const maxIndex = data.length - 1;

  const renderEODetailItemWithProps = ({item}) => {
    return <EODetailItem {...item} maxIndex={maxIndex} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        scrollEnabled={false}
        contentContainerStyle={{paddingBottom: '5%'}}
        data={data}
        renderItem={renderEODetailItemWithProps}
        style={styles.flatlist}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default EODetailList;

const styles = StyleSheet.create({
  flatlist: {
    height: '100%',
    flexGrow: 0,
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
});
