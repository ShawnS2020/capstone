import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function SortDropdown({
    handleClickSortType,
    handleClickSortDirection,
    isSortDropdownOpen,
    sortType,
    sortDirection,
}) {
    // The options for a user to sort their places feed.
    let sortTypes = ['none', 'hobby', 'rating', 'review count', 'distance', 'price'];
    // Put the user's selected sort type at the beginning of sortTypes
    sortTypes = sortTypes.filter((type) => type !== sortType);
    sortTypes.unshift(sortType);

    // Create an array called menuItems that's elements are Text components with the text of each sort type.
    const menuItems = [];
    for (let i = 0; i < sortTypes.length; i++) {
        menuItems.push(
            <TouchableWithoutFeedback key={`${i}`} onPress={() => handleClickSortType(sortTypes[i])}>
                <Text style={styles.text}>{sortTypes[i]}</Text>
            </TouchableWithoutFeedback>
        );
    }

    // let iconName = 'caret-down' when sortDirection is ascending, 'caret-up' when sortDirection is descending.;
    let iconName = (sortDirection == 'asc.') ? 'caret-down' : 'caret-up';

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Sort by:</Text>
            <View style={styles.dropdown}>
                {isSortDropdownOpen ? menuItems : menuItems[0]}
            </View>
            <TouchableWithoutFeedback onPress={handleClickSortDirection}>
                <View style={styles.sortDirection}>
                    <Text style={styles.text}>{sortDirection}</Text>
                    <FontAwesome name={iconName} size={16} />
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 28,
    },
    text: {
        fontSize: 16,
    },
    dropdown: {
        width: 100,
        alignItems: 'start',
        paddingStart: 4,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: 1,
        gap: 8,
    },
    sortDirection: {
        flexDirection: 'row',
        width: 60,
        justifyContent: 'space-between',
    }
});