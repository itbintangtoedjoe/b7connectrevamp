import {View, Text, StyleSheet} from 'react-native';

function GeneralFallback({fallbackMessage}) {
  <View style={styles.fallbackContainer}>
    <Text style={styles.fallbackText}>
      {fallbackMessage ? fallbackMessage : 'Fallback Message'}
    </Text>
  </View>;
}

export default GeneralFallback;

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  fallbackText: {
    fontSize: 16,
    color: 'black',
  },
});
