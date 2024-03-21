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
  iconColor,
}) {
  return (
    <View style={[styles.searchBarContainer, containerStyle]}>
      <GeneralPressableIcon
        name="search"
        size={24}
        color={iconColor ? iconColor : 'black'}
      />
      <TextInput
        style={[styles.searchBar, barStyle]}
        numberOfLines={1}
        placeholder={placeholder ? placeholder : 'Pencarian...'}
        placeholderTextColor={'grey'}
        onChangeText={onUpdateValue}
        cursorColor={iconColor ? iconColor : Colors.primaryColor}
        selectionColor={'lightgrey'}
        textAlignVertical="center"
        autoCapitalize="none"
        {...textInputConfig}
      />
    </View>
  );
}

export default GeneralSearchBar;

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    width: DimensionWidth * 0.9,
    height: 50,
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
    fontFamily: 'PlusJakartaSans-Regular',
  },
});
