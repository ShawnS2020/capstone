import { View, Button, StyleSheet } from 'react-native';
import Sort from './Sort';
import Filter from './Filter';

export default function PlacesMenu({
    handleClickSortType,
    handleClickSortDirection,
    handleClickFilterItem,
    handleClickApplySortAndFilters,
    isSortDropdownOpen,
    sortType,
    sortDirection,
    enabledFilters
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
                enabledFilters={enabledFilters}
            />
            <Button
                title='Apply'
                onPress={handleClickApplySortAndFilters}
                color='black'
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
        backgroundColor: '#DDD',
        rowGap: 32,
        padding: 16,
        alignItems: 'center',
        height: '100%',
    },
    applyButton: {
        borderRadius: 50,
        backgroundColor: 'black',
    }
});