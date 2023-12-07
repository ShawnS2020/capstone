import { useState, useRef, useEffect } from 'react';
import { useGlobal } from '../state/GlobalContext';
import { StyleSheet, Button, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { getAuth, db,  addDoc, getDocs, collection } from '../firebase';
import { myStyles } from './styles/forum_stylesheet';

export default function SubforumScreen({ navigation }) {
    const userAuth = getAuth();
    const { subforumTitle, setThreadTitle } = useGlobal();
    const [threadData, setThreadData] = useState([]);
    const [threadDocIDs, setThreadDocID] = useState([]);

    function handleClickThread(threadTitle, docID) {    // now takes a docID to pass to the Thread screen
        setThreadTitle(threadTitle);
        navigation.navigate('Thread', { passedThreadID: docID });
    }

    async function updateDocs() {                          
        const collectionRef = collection(db, `Subforums/${subforumTitle}/Threads`);
        const querySnapshot = await getDocs(collectionRef);     // getting a snapshot of all docs in Threads collection
        const data = querySnapshot.docs.map((doc) => doc.data().title + " ");
            setThreadData(data);        // updating global var threadData to be '(Thread n Title) (Thread n+1 title ...)'
        console.log("update threads");  
    }
    useEffect(() => {
        updateDocs();
    }, []);

    // function to store thread document IDs when grabbed. The main idea is that each thread title & each thread doc ID
    // will be in the same index location between the two arrays of idea:
    // if a document titled 'Thread 2' is the second doc title grabbed by updateDocs, then the corresponding
    // document ID for 'Thread 2' will be the second doc ID grabbed by updateDocIDs
    // thus the second doc grabbed will have its title in index location 2 of threadData array
    // and its doc ID in index location 2 of threadDocIDs array
    async function updateDocIDs() {                                              
        const collectionRef = collection(db, `Subforums/${subforumTitle}/Threads`);     
        const querySnapshot = await getDocs(collectionRef);
        const data = querySnapshot.docs.map((doc) => doc.id);
            setThreadDocID(data);
        console.log("update thread ids");
    }
    useEffect(() => {   // i don't think this is necessary to have two useEffects, will be tested before final deployment
        updateDocIDs(); 
    }, []);

    return (        
        <View style={ myStyles.container }>
            <View style = { myStyles.subforumList }>
                <Text style = { myStyles.subforumText }>
                     { subforumTitle } Subforum
                </Text>
            </View>

            <ScrollView>
                {threadData.map((element, index) => (       // loop through array of threads, create a TouchableOpacity (Button) for each thread
                    <TouchableOpacity
                    style={{padding:2}}
                    key={ index } // Use a unique key for each button
                    onPress={() => handleClickThread(element, threadDocIDs[index])} 
                    >   
                        <Text style={ myStyles.forum_text }>{element}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <TouchableOpacity 
                style={myStyles.true_button}
                onPress={() => navigation.navigate("Create Thread")}
            >
                <Text style={myStyles.button_text}>Add New Thread</Text>
            </TouchableOpacity>


      </View>
    )
}

// Leaving this here in case we need
// const styles = StyleSheet.create({
//     body: {
//         alignItems: 'center',
//         flex: 1,
//         backgroundColor: 'white',
//         paddingVertical: 20
//     },
//     subforumList: {
//         alignItems: 'center'
//     },
//     subforumText:{
//         fontSize: 40,
//         padding:5,
//         color: 'rgba(185, 15, 5, 1)'
//     },
//     button: {
//         alignItems: 'center',
//         width: '100%',
//         height: 50,
//         backgroundColor: 'rgba(180, 10, 30)',
//         paddingVertical: 12,
//         paddingHorizontal: 12,
//         borderRadius: 5,
//         marginTop: 5
//     },
//     buttonContent: {
//         color: 'gold',
//         fontWeight: '900'
//     }
// });