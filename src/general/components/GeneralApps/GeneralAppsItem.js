import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Colors from '../../constants/Colors';
import GeneralIonicons from '../GeneralIonicons';

function GeneralAppsItem({
  onPress,
  app,
  appTitle,
  appIcon,
  appColor,
  iconStyle,
  titleStyle,
}) {
  function pressHandler(type) {
    switch (type) {
      case 'TARA':
        console.log('tara');
        break;
      case 'CAM':
        console.log('cam');
        break;
      case 'Ekspedisi Online':
        console.log('eo');
        break;
      case 'Reservasi Mobil':
        console.log('rm');
        break;
      case 'Chatbot':
        console.log('chatbot');
        break;
      case 'Sensory Online':
        console.log('so');
        break;
      case 'More':
        console.log('more');
        break;
      default:
        break;
    }
  }

  return (
    <View style={styles.appContainer}>
      {app && (
        <>
          <Pressable
            onPress={() => pressHandler(appTitle)}
            style={({pressed}) => pressed && styles.pressed}>
            <View
              style={[styles.appIcon, iconStyle, {backgroundColor: appColor}]}>
              <GeneralIonicons name={appIcon} size={28} color="white" />
            </View>
          </Pressable>
          <Text style={[styles.appTitleText, titleStyle]}>{appTitle}</Text>
        </>
      )}
    </View>
  );
}

export default GeneralAppsItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
  appContainer: {
    //borderWidth: 1,
    height: 90,
    width: 60,
    marginVertical: 6,
  },
  appIcon: {
    height: 60,
    width: 60,
    backgroundColor: Colors.primaryColor,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appTitleText: {
    //borderWidth: 1,
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 4,
  },
});
