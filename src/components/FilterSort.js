import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import SortDropdown from './SortDropdown';

export default function FilterSort() {
  const [isDropdown, setIsDropdown] = useState(false);
  const [iconName, setIconName] = useState('caret-down');
  const [sortIcon, setSortIcon] = useState('caret-down');
  const [sortDirection, setSortDirection] = useState('asc.');

  function handleClickSortDirection() {
    setSortDirection(sortDirection === 'asc.' ? 'desc.' : 'asc.');
  }

  function handleClick() {
    setIsDropdown(!isDropdown);
    setIconName(isDropdown ? 'caret-down' : 'caret-up');
  }

  return (
    <View>
      <SortDropdown sortDirection={sortDirection} handleClickSortDirection={handleClickSortDirection} />
      <View>
        <TouchableWithoutFeedback onPress={handleClick}>
            <View style={styles.filterContainer}>
                <Text>Filters:</Text>
                <FontAwesome name={iconName} size={16} />
            </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});