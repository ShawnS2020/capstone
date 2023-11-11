import { View, Text, StyleSheet } from 'react-native';
import FilterSort from '../components/FilterSort';

export default function PlacesMenu() {
    return (
        <View style={styles.container}>
            <FilterSort />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 1,
        alignSelf: 'flex-end',
        top: 0,
        backgroundColor: '#F2F2F2',
        padding: 16,
        alignItems: 'center',
        height: '100%',
    },
});