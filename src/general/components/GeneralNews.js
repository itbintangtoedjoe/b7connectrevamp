import {View, Text, StyleSheet, Dimensions, Platform} from 'react-native';
import GeneralNewsList from './GeneralNews/GeneralNewsList';
import GeneralIonicons from './GeneralIonicons';
import PlusJakartaSansText from '../../../fonts/PlusJakartaSansText';
import PoppinsText from '../../../fonts/PoppinsText';
import GeneralLoadingOverlay from './GeneralLoadingOverlay';

const dimensionWidth = Dimensions.get('window').width;

function GeneralNews({data}) {
  return (
    <View style={styles.newsContainer}>
      <View style={styles.titleContainer}>
        <PoppinsText weight="Bold" style={styles.titleText}>
          News & Events
        </PoppinsText>
        <PoppinsText
          weight="Medium"
          style={styles.swipeText}>{`Swipe for more >>`}</PoppinsText>
      </View>
      <GeneralNewsList data={data} />
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
    fontSize: 18,
    marginBottom: Platform.OS === 'ios' ? 0 : -8,
  },
  swipeText: {
    color: 'grey',
    marginBottom: Platform.OS === 'ios' ? 0 : -6,
  },
});
