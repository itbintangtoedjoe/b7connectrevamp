import {useState} from 'react';
import {StyleSheet, View, Pressable} from 'react-native';

import GeneralIonicons from './GeneralIonicons';
import Colors from '../constants/Colors';

function GeneralPasswordToggle({onChange}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordHandler() {
    if (isPasswordVisible) {
      setIsPasswordVisible(false);
    } else if (!isPasswordVisible) {
      setIsPasswordVisible(true);
    }
    onChange();
  }

  let toggleContent = (
    <>
      <View style={styles.toggle}></View>
      <View style={styles.toggleIcon}>
        <GeneralIonicons name="eye-off" size={20} color="black" />
      </View>
    </>
  );

  if (isPasswordVisible) {
    toggleContent = (
      <>
        <View style={styles.toggleIcon}>
          <GeneralIonicons name="eye" size={20} color="black" />
        </View>
        <View style={styles.toggle}></View>
      </>
    );
  }

  return (
    <Pressable onPress={togglePasswordHandler}>
      <View style={styles.toggleContainer}>{toggleContent}</View>
    </Pressable>
  );
}

export default GeneralPasswordToggle;

const styles = StyleSheet.create({
  toggleContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 20,
    borderColor: Colors.primaryColor,
    borderWidth: 2,
    width: 70,
    height: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 2,
  },
  toggle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: 30,
    width: '50%',
    height: '100%',
  },
  toggleIcon: {
    //borderWidth: 1,
    width: '50%',
    height: '100%',
    alignItems: 'center',
  },
});
