import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import Colors from '../constants/Colors';

function GeneralLoadingOverlay({message, loadingColor, textStyle}) {
  return (
    <View style={styles.container}>
      <Text style={[styles.message, textStyle]}>{message}</Text>
      <ActivityIndicator
        size="large"
        color={loadingColor ? loadingColor : Colors.primaryColor}
      />
    </View>
  );
}

export default GeneralLoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    color: Colors.primaryColor,
    fontSize: 16,
    marginBottom: 16,
  },
});
