import { useState, useRef } from 'react';
import { observer, inject } from 'mobx-react';
import { View, Text, ScrollView, ImageBackground, Button, TouchableWithoutFeedback, Image, StyleSheet, Switch, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { getCoordinates } from '../api/PlaceAutocomplete';
import HomeLocation from '../components/HomeLocation';

export default inject('guestAccountStore')(observer(({ guestAccountStore }) => {
    const [homeLocation, setHomeLocation] = useState(guestAccountStore.homeLocation);
    const [isEditingHomeLocation, setIsEditingHomeLocation] = useState(false);
    const [iconName, setIconName] = useState('mode-edit');
    const [textInputYPosition, setTextInputYPosition] = useState(0);
    const scrollViewRef = useRef();

    const [selectedHobbies, setSelectedHobbies] = useState([...guestAccountStore.hobbies]);
    const [newHobby, setNewHobby] = useState('');
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
        guestAccountStore.changeHobbies(selectedHobbies.filter((hobby) => !checkedHobbies.includes(hobby)));
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
            if (homeLocation.description != guestAccountStore.homeLocation.description) {
                const coordinates = await getCoordinates(homeLocation.place_id);
                guestAccountStore.changeHomeLocation({ description: homeLocation.description, coordinates: [coordinates.lat, coordinates.lng] });
            }
        }
    }

    function toggleUseCurrentLocation() {
        guestAccountStore.toggleUseCurrentLocation();
    }

    return (
        <ScrollView ref={scrollViewRef} style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
            <Image 
                source={{uri: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSOUNJZAWeC9NIB0R7h22mZwfRMTEHr7PBDNihFBmmR4U8fklya'}}
                style={{width: 100, height: 100, alignSelf: 'center' }}
            />
            <Text style={styles.usernameText}>{guestAccountStore.username}</Text>

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
                <View onLayout={(event) => setTextInputYPosition(event.nativeEvent.layout.y)}>
                    <HomeLocation setHomeLocation={setHomeLocation} scrollViewRef={scrollViewRef} textInputYPosition={textInputYPosition}  />
                </View>
            )}
            <View style={styles.useCurrentLocationSwitch}>
              <Text>Use current Location</Text>
              <Switch
                value={guestAccountStore.useCurrentLocation}
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