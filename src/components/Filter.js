import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import dummyAccountStore from '../state/DummyAccountStore';

export default function FilterDropdown({ handleClickFilterItem, isFilterDropdownOpen }) {
    const filters = ['1 mile', '5 miles', '10 miles', '$', '$$', '$$$', '$$$$', ...dummyAccountStore.hobbies]

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Filters:</Text>
            <View style={styles.filterItemsContainer}>
                {filters.map((filter, i) => (
                    <TouchableWithoutFeedback key={i} onPress={() => handleClickFilterItem(filter)}>
                        <View style={styles.filterItem}>
                            <Text style={styles.text}>{filter}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    heading: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    filterItemsContainer: {
        borderColor: 'black',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingVertical: 8,
        rowGap: 8,
    },
    filterItem: {
        display: 'inline-block',
        minWidth: 64,
        alignItems: 'center',
        marginHorizontal: 4,
        paddingHorizontal: 4,
        backgroundColor: '#AAAAFF',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 24,
    },
    text: {
        fontSize: 16,
    },
    icon: {
        marginLeft: 8
    }
});