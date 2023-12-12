import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import guestAccountStore from '../state/GuestAccountStore';

export default function FilterDropdown({ handleClickFilterItem, enabledFilters }) {
    const filters = ['1 mile', '5 miles', '10 miles', '$', '$$', '$$$', '$$$$', ...guestAccountStore.hobbies]
    // Sort filters so that elements that exist in enabledFilters are at the beginning of filters.
    filters.sort((a, b) => {
        if (enabledFilters.includes(a) && !enabledFilters.includes(b)) {
            return -1;
        } else if (!enabledFilters.includes(a) && enabledFilters.includes(b)) {
            return 1;
        } else {
            return 0;
        }
    });

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Filters:</Text>
            <View style={styles.filterItemsContainer}>
                {filters.map((filter, i) => (
                    <TouchableWithoutFeedback key={i} onPress={() => handleClickFilterItem(filter)}>
                        <View style={[styles.filterItem, enabledFilters.includes(filter) && styles.selectedFilterItem]}>
                            <Text style={[styles.text, styles.filterText]}>{filter}</Text>
                            {enabledFilters.includes(filter) && <AntDesign name="close" size={16} color="black" style={styles.icon} />}
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
        flexDirection: 'row',
        minWidth: 64,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
        paddingHorizontal: 4,
        backgroundColor: '#CCCCFF',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 24,
        height: 24
    },
    selectedFilterItem: {
        backgroundColor: '#7777FF',
        paddingRight: 24,
    },
    filterText: {
    },
    text: {
        fontSize: 16,
    },
    icon: {
        position: 'absolute',
        right: 4
    }
});