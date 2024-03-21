import {View, Text, StyleSheet, Platform} from 'react-native';
import GeneralBulletinBoardList from './GeneralBulletinBoard/GeneralBulletinBoardList';
import PlusJakartaSansText from '../../../fonts/PlusJakartaSansText';
import PoppinsText from '../../../fonts/PoppinsText';

function GeneralBulletinBoard({data}) {
  return (
    <View style={styles.bulletinBoardContainer}>
      <View style={styles.titleContainer}>
        <PoppinsText weight="Bold" style={styles.titleText}>
          Bulletin Board
        </PoppinsText>
        <PoppinsText
          weight="Medium"
          style={styles.swipeText}>{`Swipe for more >>`}</PoppinsText>
      </View>
      <GeneralBulletinBoardList data={data} />
    </View>
  );
}

export default GeneralBulletinBoard;

const styles = StyleSheet.create({
  bulletinBoardContainer: {
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
