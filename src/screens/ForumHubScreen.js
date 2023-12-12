import { useState, useRef, useEffect } from 'react';
import { Button, View, TouchableOpacity, Text } from 'react-native';
import { useGlobal } from '../state/GlobalContext';
import { getAuth, db,  addDoc, getDocs, collection } from '../firebase';
import { myStyles } from './styles/forum_stylesheet';

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
        <View style={myStyles.container}>
            <View style={myStyles.container}>
            {subforumData.map((element, index) => (       // loop through array of threads, create a TouchableOpacity (Button) for each thread
                <TouchableOpacity
                style={{padding:2}}
                key={index}
                // style={myStyles.forumSelection}  /* Adjust the style name here */
                onPress={() => handleClickSubforum(element)}
              >
                <Text style={myStyles.forum_text}>{element}</Text>
              </TouchableOpacity>
                

                // <Button
                // key={ index } // Use a unique key for each button
                // //style={ styles.button }
                // onPress={() => handleClickSubforum(element)} 
                   
                //     title={element}
                // />
            ))}    
            
            {/* <Button
                style={myStyles.log_out}
                onPress={() => logout()}
                title="Logout"
            /> */}
            
            </View>
            
            <TouchableOpacity  
                onPress={() => logout()}
                style={myStyles.true_button}
            >
                <Text style={myStyles.button_text}>Logout</Text>
            </TouchableOpacity>

        </View>
    );
}