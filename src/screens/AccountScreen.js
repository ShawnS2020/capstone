import { useState, useRef } from 'react';
import { observer, inject } from 'mobx-react';
import { View, Text, ScrollView, ImageBackground, Button, TouchableWithoutFeedback, Image, StyleSheet, Switch, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { getPredictions, getCoordinates } from '../api/PlaceAutocomplete';

export default inject('dummyAccountStore')(observer(({ dummyAccountStore }) => {
    const [homeLocation, setHomeLocation] = useState(dummyAccountStore.homeLocation);
    const [isEditingHomeLocation, setIsEditingHomeLocation] = useState(false);
    const [iconName, setIconName] = useState('mode-edit');
    const [searchQuery, setSearchQuery] = useState(homeLocation.description);
    const [textInputYPosition, setTextInputYPosition] = useState(0);
    const [predictions, setPredictions] = useState([]);
    const scrollViewRef = useRef();

    const [selectedHobbies, setSelectedHobbies] = useState([...dummyAccountStore.hobbies]);
    const [newHobby, setNewHobby] = useState(''); // State to store the new hobby
    const [editingHobbies, setEditingHobbies] = useState(false);
    const [checkedHobbies, setCheckedHobbies] = useState([]);

    const toggleHobbySelection = (hobby) => {
        if (editingHobbies) {
            if (checkedHobbies.includes(hobby)) {
                setCheckedHobbies(checkedHobbies.filter((checked) => checked !== hobby));
            } else {
                setCheckedHobbies([...checkedHobbies, hobby]);
            }
        }
    };

    const addNewHobby = () => {
        if (newHobby.trim() !== '') {
            // Add the new hobby to the selected hobbies list
            setSelectedHobbies([...selectedHobbies, newHobby]);
            // Clear the text input
            setNewHobby('');
        }
    };

    const saveHobbies = () => {
        // Implement the logic to save selectedHobbies to data store/db
        setSelectedHobbies(selectedHobbies.filter((hobby) => !checkedHobbies.includes(hobby)));
        setCheckedHobbies([]);
        setEditingHobbies(false);
    };


    async function handleEditHomeLocation() {
        setIsEditingHomeLocation(!isEditingHomeLocation);
        if (!isEditingHomeLocation) {
            setIconName('check');
        } else {
            setIconName('mode-edit');
            // Update Account Store if homeLocation has changed.
            // This check is necessary because homeLocation.place_id will not exist unless a prediction is selected.
            if (homeLocation.description != dummyAccountStore.homeLocation.description) {
                const coordinates = await getCoordinates(homeLocation.place_id);
                dummyAccountStore.changeHomeLocation({ description: homeLocation.description, coordinates: [coordinates.lat, coordinates.lng] });
            }
        }
    }

    async function handleHomeLocationOnChange() {
        const predictions = await getPredictions(searchQuery);
        setPredictions(predictions);
    }

    function toggleUseCurrentLocation() {
        dummyAccountStore.toggleUseCurrentLocation();
    }

    return (
        <ScrollView ref={scrollViewRef} style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
            <Image 
                source={{uri: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSOUNJZAWeC9NIB0R7h22mZwfRMTEHr7PBDNihFBmmR4U8fklya'}}
                style={{width: 100, height: 100, alignSelf: 'center' }}
            />
            <Text style={styles.usernameText}>{dummyAccountStore.username}</Text>

            <View style={styles.row}>
                <Text style={styles.header}>Hobbies</Text>
                <TouchableWithoutFeedback onPress={ () => editingHobbies ? saveHobbies() : setEditingHobbies(true) }>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons name={ editingHobbies ? 'check' : 'mode-edit'} size={24} />
                    </View>
                </TouchableWithoutFeedback>
            </View>
            {editingHobbies ? (
                <View>
                    {selectedHobbies.map((hobby, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => toggleHobbySelection(hobby)}
                            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
                        >
                            <ImageBackground
                                source={checkedHobbies.includes(hobby) ? require('capstone/assets/unchecked.png') : require('capstone/assets/checked.png')}
                                style={{ width: 24, height: 24, marginRight: 10 }}
                            />
                            <Text>{hobby.charAt(0).toUpperCase() + hobby.slice(1)}</Text>
                        </TouchableOpacity>
                    ))}
                    <View style={styles.row}>
                        <TextInput
                            placeholder="Enter new hobby"
                            value={newHobby}
                            onChangeText={(text) => setNewHobby(text)}
                            style={{ borderWidth: 1, borderColor: 'gray', paddingHorizontal: 8 }}
                        />
                        <Button title="Add" onPress={addNewHobby} color='black'/>
                    </View>
                </View>
            ) : (
                selectedHobbies.map((hobby, index) => (
                    <Text key={index}>{hobby.charAt(0).toUpperCase() + hobby.slice(1)}</Text>
                ))
            )}

            <View style={styles.row}>
                <Text style={styles.header}>Home Location</Text>
                <TouchableWithoutFeedback onPress={handleEditHomeLocation}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons name={iconName} size={24} />
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <Text style={styles.homeLocation}>{homeLocation.description}</Text>
            {isEditingHomeLocation && (
                <>
                    <TextInput
                        onLayout={(event) => setTextInputYPosition(event.nativeEvent.layout.y)}
                        selectTextOnFocus={true}
                        onChangeText={(text) => {
                            setSearchQuery(text);
                            handleHomeLocationOnChange();
                            scrollViewRef.current.scrollTo({ y: textInputYPosition });
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
                </>
            )}
            <View style={styles.useCurrentLocationSwitch}>
              <Text>Use current Location</Text>
              <Switch
                value={dummyAccountStore.useCurrentLocation}
                onValueChange={toggleUseCurrentLocation}
              />
            </View>
        </ScrollView>
    );
}));

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#FFF',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    usernameText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    header: {
        fontWeight: 'bold',
        marginVertical: 8,
        fontSize: 16
    },
    hobbyList: {
        flexGrow: 0,
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
    },
    searchQueryPrediction: {
        minWidth: 280,
    },
    searchQueryPredictionSecondaryText: {
        color: 'gray',
    },
    searchQueryPredictionDivider: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginVertical: 4,
    },
    text: {
        fontSize: 16,
    },
    useCurrentLocationSwitch: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-around',
    },
});