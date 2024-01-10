import {View, Text, StyleSheet} from 'react-native';
import GeneralBulletinBoardList from './GeneralBulletinBoard/GeneralBulletinBoardList';

function GeneralBulletinBoard() {
  return (
    <View style={styles.bulletinBoardContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Bulletin Board</Text>
        <Text style={styles.swipeText}>Swipe for more</Text>
      </View>
      <GeneralBulletinBoardList />
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
    fontWeight: 'bold',
    fontSize: 18,
  },
  swipeText: {
    color: 'grey',
    fontWeight: 'bold',
  },
});
