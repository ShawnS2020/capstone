import { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TextInput, Switch } from 'react-native'
import { inject, observer } from 'mobx-react';
import { getPredictions, getCoordinates } from '../api/PlaceAutocomplete';

export default inject('dummyAccountStore')(observer(({ setHomeLocation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [predictions, setPredictions] = useState([]);

    async function handleHomeLocationOnChange() {
        const predictions = await getPredictions(searchQuery);
        setPredictions(predictions);
    }

    return (
        <View>
            <TextInput
                selectTextOnFocus={true}
                onChangeText={(text) => {
                    setSearchQuery(text);
                    handleHomeLocationOnChange();
                }}
                value={searchQuery}
                style={styles.searchBar}
            />
            {predictions.map((prediction, index) => (
                <TouchableWithoutFeedback key={index} onPress={() => {
                    setHomeLocation(prediction);
                    setSearchQuery(prediction.structured_formatting.main_text);
                }}>
                    <View key={index} style={styles.searchQueryPrediction}>
                        <Text>{prediction.structured_formatting.main_text}</Text>
                        <Text style={styles.searchQueryPredictionSecondaryText}>{prediction.structured_formatting.secondary_text}</Text>
                        <View style={styles.searchQueryPredictionDivider} />
                    </View>
                </TouchableWithoutFeedback>
            ))}
        </View>
    );
}));

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    header: {
        fontWeight: 'bold',
        marginVertical: 8,
        fontSize: 16
    },
    homeLocation: {
        maxWidth: '80%',
    },
    searchBar: {
        minWidth: 280,
        height: 36,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 20,
        marginVertical: 8,
        paddingHorizontal: 8,
        backgroundColor: '#FFF',
    },
    searchQueryPrediction: {
        minWidth: 280,
        backgroundColor: '#FFF',
        paddingHorizontal: 8,
    },
    searchQueryPredictionSecondaryText: {
        color: 'gray'
    },
    searchQueryPredictionDivider: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginVertical: 4,
    },
    useCurrentLocationSwitch: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-around',
    },
});