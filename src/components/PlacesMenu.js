import { View, Text, StyleSheet } from 'react-native';
import Sort from './Sort';
import Filter from './Filter';

export default function PlacesMenu({
    handleClickSortType,
    handleClickSortDirection,
    handleClickFilterItem,
    isSortDropdownOpen,
    sortType,
    sortDirection,
    isFilterDropdownOpen
}) {
    return (
        <View style={styles.container}>
            <Sort
                handleClickSortType={handleClickSortType}
                handleClickSortDirection={handleClickSortDirection}
                isSortDropdownOpen={isSortDropdownOpen}
                sortType={sortType}
                sortDirection={sortDirection}
            />
            <Filter
                handleClickFilterItem={handleClickFilterItem}
                isFilterDropdownOpen={isFilterDropdownOpen}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '75%',
        position: 'absolute',
        zIndex: 1,
        alignSelf: 'flex-end',
        top: 0,
        backgroundColor: '#CCCCCC',
        padding: 16,
        alignItems: 'center',
        height: '100%',
    },
});