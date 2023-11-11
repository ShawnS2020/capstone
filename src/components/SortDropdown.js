import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function SortDropdown({sortDirection, handleClickSortDirection}) {
    const [isDropdown, setIsDropdown] = useState(false);
    const [sortTypes, setSortTypes] = useState([
        'none',
        'rating',
        'review count',
        'distance',
    ]);

    function handleClickDropdown() {
        setIsDropdown(!isDropdown);
    }

    // let iconName = 'caret-down' when sortDirection is ascending, 'caret-up' when sortDirection is descending.;
    let iconName = (sortDirection == 'asc.') ? 'caret-down' : 'caret-up';

    // Create an array called menuItems that's elements are Text components with the text of each sort type.
    const menuItems = [];
    for (let i = 0; i < sortTypes.length; i++) {
        menuItems.push(<Text key={`${i}`} style={styles.text}>{sortTypes[i]}</Text>);
    }

    return (
        <View style={styles.sortContainer}>
            <Text style={styles.text}>Sort by:</Text>
            <TouchableWithoutFeedback onPress={handleClickDropdown}>
                <View style={styles.dropdown}>
                    {isDropdown ? menuItems : menuItems[0]}
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={handleClickSortDirection}>
                <View style={styles.sortDirection}>
                    <Text style={styles.text}>{sortDirection}</Text>
                    <FontAwesome name={iconName} size={16} style={styles.icon} />
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    sortContainer: {
        flexDirection: 'row',
        marginVertical: 16,
        fontSize: 28,
    },
    text: {
        fontSize: 16,
    },
    dropdown: {
        marginHorizontal: 8,
        width: 100,
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: 1,
    },
    sortDirection: {
        flexDirection: 'row',
        width: 60,
        justifyContent: 'space-between',
    },
    icon: {
        marginLeft: 8
    }
});