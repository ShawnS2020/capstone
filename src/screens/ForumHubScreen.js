import { useState, useRef, useEffect } from 'react';
import { Button, View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useGlobal } from '../state/GlobalContext';
import { getAuth, db,  addDoc, getDocs, collection } from '../firebase';

export default function ForumHubLoggedIn({ navigation }) {
    const { logout, setSubforumTitle } = useGlobal();
    const [subforumData, setSubforumData] = useState([]);

    function handleClickSubforum(subforumTitle) {
        setSubforumTitle(subforumTitle);
        navigation.navigate('Subforum');
    }

    async function updateDocs() {                          
        const collectionRef = collection(db, 'Subforums');
        const querySnapshot = await getDocs(collectionRef);     // getting a snapshot of all docs in Subforums collection
        const data = querySnapshot.docs.map((doc) => doc.id);
            setSubforumData(data);        // updating global var subforumData 
        console.log("update subforums");  
    }
    useEffect(() => {
        updateDocs();
    }, []);

    return (
        <View style={{flex:1}}>
            <View style={{flex:1}}>
            {subforumData.map((element, index) => (       // loop through array of threads, create a TouchableOpacity (Button) for each thread
                <Button
                key={ index } // Use a unique key for each button
                //style={ styles.button }
                onPress={() => handleClickSubforum(element)} 
                   
                    title={element}
                />
            ))}    
            </View>
            <Button
                onPress={() => logout()}
                title="Logout"
            />
        </View>
    );
}