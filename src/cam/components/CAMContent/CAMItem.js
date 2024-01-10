import React from 'react';
import {View, Text, StyleSheet, Pressable, Dimensions} from 'react-native';

import Colors from '../../../general/constants/Colors';
import Styles from '../../../general/constants/Styles';
import {GetFormattedName} from '../../../general/utils/HelperMethods';
import CAMModalButton from './CAMModalButton';
import CAMModal from './CAMModal';

const DimensionWidth = Dimensions.get('window').width;

function CAMItem({
  app,
  transactionId,
  transactionDate,
  requesterName,
  remarks,
}) {
  const [isClicked, setIsClicked] = React.useState(false);
  const [modalViewVisible, setModalViewVisible] = React.useState(null);
  const [modalActionVisible, setModalActionVisible] = React.useState(null);
  const [modalActionType, setModalActionType] = React.useState('Action');
  const formattedRequesterName = GetFormattedName(requesterName);

  function clickHandler() {
    if (isClicked) {
      setIsClicked(false);
    } else if (!isClicked) {
      setIsClicked(true);
    }
  }

  const modal = (
    <>
      <CAMModal
        modalVisible={modalViewVisible}
        onClose={() => setModalViewVisible(false)}
        view
        viewId={transactionId}
      />
      <CAMModal
        modalVisible={modalActionVisible}
        onClose={() => setModalActionVisible(false)}
        action
        actionType={modalActionType}
      />
    </>
  );

  async function modalHandler(modalType, actionType) {
    if (modalType === 'View') {
      setModalViewVisible(true);
    } else if (modalType === 'Action') {
      setModalActionType(actionType);
      setModalActionVisible(true);
    }
  }

  return (
    <View style={[styles.outContainer, Styles.shadow]}>
      <Pressable
        onPress={clickHandler}
        style={({pressed}) => [
          styles.rootContainer,
          Styles.shadow,
          pressed && Styles.pressed,
        ]}>
        {modal}
        <View style={styles.contentContainer}>
          <Text style={styles.titleText}>Application</Text>
          <Text style={styles.descText}>{app}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.titleText}>Transaction Number</Text>
          <Text style={styles.descText}>{transactionId}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.titleText}>Transaction Date</Text>
          <Text style={styles.descText}>{transactionDate}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.titleText}>Requester</Text>
          <Text style={[styles.descText, {fontWeight: '800'}]}>
            {formattedRequesterName}
          </Text>
        </View>
      </Pressable>
      <View style={{paddingHorizontal: 12, paddingVertical: 8}}>
        <Text style={[styles.titleText, {fontWeight: '800', color: 'white'}]}>
          Remarks
        </Text>
        <Text
          style={[
            styles.descText,
            {
              fontWeight: 'normal',
              textAlign: 'justify',
              marginTop: 2,
              color: 'white',
            },
          ]}>
          {remarks}
        </Text>
      </View>
      {isClicked && (
        <View style={styles.buttonContainer}>
          <CAMModalButton
            onPress={() => modalHandler('View')}
            title="View"
            iconName="search"
            //iconColor="white"
            iconSize={24}
            fill={true}
            containerStyle={{backgroundColor: 'white'}}
            textStyle={{
              marginHorizontal: 12,
              fontSize: 18,
              color: Colors.primaryColor,
            }}
          />
          <View style={styles.modalButtonContainer}>
            <CAMModalButton
              onPress={() => modalHandler('Action', 'Approve')}
              title="Approve"
              containerStyle={{width: '30%'}}
            />
            <CAMModalButton
              onPress={() => modalHandler('Action', 'Reject')}
              title="Reject"
              iconName="close"
              containerStyle={{width: '30%'}}
            />
            <CAMModalButton
              onPress={() => modalHandler('Action', 'Revise')}
              title="Revise"
              iconName="pencil"
              containerStyle={{width: '30%'}}
            />
          </View>
        </View>
      )}
    </View>
  );
}

export default CAMItem;

const styles = StyleSheet.create({
  outContainer: {
    width: DimensionWidth * 0.9,
    margin: 8,
    borderRadius: 12,
    backgroundColor: Colors.primaryColor,
  },
  rootContainer: {
    width: '100%',
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  remarksContainer: {
    borderRadius: 12,
    width: '100%',
    justifyContent: 'space-between',
  },
  titleText: {
    flex: 3,
    fontWeight: '500',
    fontSize: 12,
    color: 'grey',
  },
  descText: {
    flex: 4,
    fontWeight: '500',
    fontSize: 12,
    color: 'black',
    flexWrap: 'wrap',
    textAlign: 'right',
  },
  buttonContainer: {
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});
