import {View, Text, StyleSheet} from 'react-native';
import GeneralNewsList from './GeneralNews/GeneralNewsList';
import GeneralIonicons from './GeneralIonicons';

function GeneralNews() {
  return (
    <View style={styles.newsContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>News & Event</Text>
        <Text style={styles.swipeText}>{`See more >`}</Text>
      </View>
      <GeneralNewsList />
    </View>
  );
}

export default GeneralNews;

const styles = StyleSheet.create({
  newsContainer: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 18,
  },
  titleText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  swipeText: {
    color: 'grey',
    fontWeight: 'bold',
  },
});
