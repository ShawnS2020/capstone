// import { observer } from 'mobx-react';
// import { View, Text, FlatList, Image} from 'react-native';


// function AccountScreen({ route }) {
//     const { dummyAccountStore } = route.params;
//     const keyExtractor = (item, index) => index.toString();
//     return(
    
//         <View style={{backgroundColor:'white'}}>
//             <Image 
//         source={{uri: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSOUNJZAWeC9NIB0R7h22mZwfRMTEHr7PBDNihFBmmR4U8fklya'}}
//         style={{width: 100, height: 100, alignSelf: 'center' }}
//             />
//             <View style={{paddingHorizontal:30,marginBottom: 25}}>
//                 <Text style={{textAlign: 'center',fontSize: 24,fontWeight: 'bold', marginTop:15, marginBottom:5}}> John Smith </Text>
//             </View>

//             <View style={{paddingHorizontal:30,marginBottom: 25}}>
//             <Text style={{textAlign: 'center',fontSize:15,fontWeight: 'bold', marginTop:15, marginBottom:5}}>Hobbies</Text>
//             <FlatList style={{textAlign: 'center',fontSize:15,fontWeight: 'bold', marginTop:15, marginBottom:5}}
//                 data={dummyAccountStore.hobbies}
//                 renderItem={({ item }) => <Text style={{textAlign: 'center'}}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>}
//                 keyExtractor={keyExtractor}
//             />
//             </View>


//         <View style={{paddingHorizontal:30,marginBottom: 25}}>
//             <Text style={{textAlign: 'center',fontSize:15,fontWeight: 'bold', marginTop:15, marginBottom:5}}>Home Location</Text>
//             <Text style={{textAlign: 'center'}}>{dummyAccountStore.homeLocation.join(", ")}</Text>
//         </View>
//         </View>
        
      
        
        
        
//     );
// }

// export default observer(AccountScreen);

import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { View, Text, FlatList, Image, Button, TouchableOpacity, ImageBackground, TextInput } from 'react-native';

function AccountScreen({ route }) {
    const { dummyAccountStore } = route.params;
    const keyExtractor = (item, index) => index.toString();
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

    return (
        <View style={{ backgroundColor: 'white' }}>
            <Image
                source={{
                    uri: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSOUNJZAWeC9NIB0R7h22mZwfRMTEHr7PBDNihFBmmR4U8fklya'
                }}
                style={{ width: 100, height: 100, alignSelf: 'center' }}
            />
            <View style={{ paddingHorizontal: 30, marginBottom: 25 }}>
                <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold', marginTop: 15, marginBottom: 5 }}> John Smith </Text>
            </View>

            <View style={{ paddingHorizontal: 30, marginBottom: 25 }}>
                <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold', marginTop: 15, marginBottom: 5 }}>Hobbies</Text>
                {editingHobbies ? (
                    <View>
                        <FlatList
                            data={selectedHobbies}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => toggleHobbySelection(item)}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginBottom: 10,
                                    }}
                                >
                                    <ImageBackground
                                        source={checkedHobbies.includes(item) ? require('capstone/assets/checked.png') : require('capstone/assets/unchecked.png')}
                                        style={{ width: 24, height: 24, marginRight: 10 }}
                                    />
                                    <Text style={{ textAlign: 'center' }}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={keyExtractor}
                        />

                        {/* Text input for new hobby */}
                        <TextInput
                            placeholder="Enter new hobby"
                            value={newHobby}
                            onChangeText={(text) => setNewHobby(text)}
                            style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10, paddingHorizontal: 8 }}
                        />

                        {/* Button to add new hobby */}
                        <Button title="Add New Hobby" onPress={addNewHobby} />
                    </View>
                ) : (
                    <FlatList
                        data={selectedHobbies}
                        renderItem={({ item }) => (
                            <Text style={{ textAlign: 'center' }}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
                        )}
                        keyExtractor={keyExtractor}
                    />
                )}
            </View>

            {editingHobbies ? (
                <Button title="Save" onPress={saveHobbies} />
            ) : (
                <Button title="Modify hobbies" onPress={() => setEditingHobbies(true)} />
            )}

            <View style={{ height: 50 }}></View>
        </View>
    );
}

export default observer(AccountScreen);