import React from 'react';
import {StyleSheet, View, TextInput, Dimensions} from 'react-native';

import Colors from '../../general/constants/Colors';
import GeneralPressableIcon from '../../general/components/GeneralPressableIonicons';

const DimensionWidth = Dimensions.get('window').width;

function GeneralSearchBar({
  placeholder,
  onUpdateValue,
  containerStyle,
  barStyle,
  textInputConfig,
}) {
  return (
    <View style={[styles.searchBarContainer, containerStyle]}>
      <TextInput
        style={[styles.searchBar, barStyle]}
        placeholder={placeholder ? placeholder : 'Search...'}
        onChangeText={onUpdateValue}
        selectionColor={Colors.primaryColor}
        textAlignVertical="center"
        {...textInputConfig}
      />
      <GeneralPressableIcon name="search" size={24} color="black" />
    </View>
  );
}

export default GeneralSearchBar;

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    width: DimensionWidth * 0.9,
    height: 55,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.primaryColor,
  },
  searchBar: {
    width: '90%',
  },
});
