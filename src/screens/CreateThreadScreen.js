import { useGlobal } from '../state/GlobalContext';
import React from 'react';
import { StyleSheet, Button, View, TextInput, TouchableOpacity, Text, ScrollView} from 'react-native';
import { db,  addDoc, collection, serverTimestamp, doc, getAuth, setDoc, getDoc, updateDoc, query } from '../firebase';
import { myStyles } from './styles/forum_stylesheet';

export default function CreateThreadScreen({ navigation }){

    const userAuth = getAuth();
    const { subforumTitle, setThreadTitle } = useGlobal();
    const [newThreadTitle, onChangeTitle] = React.useState('');
    const [newThreadText, onChangeThreadText] = React.useState('');

    function handleClickThread(threadTitle, docID) {        // navigation function passes thread doc ID to load thread information in thread.js
        setThreadTitle(threadTitle);
        navigation.navigate('Thread', { passedThreadID: docID });
    }

    async function createThread(){
        const collectionRef = collection(db, `Subforums/${ subforumTitle }/Threads`);
        addDoc((db, collectionRef), { title: newThreadTitle, text: newThreadText, createdBy: userAuth.currentUser.email, createdAt: serverTimestamp() })
            .then(docRef => { 
                handleClickThread(newThreadTitle, docRef.id);   // navigate to the newly created thread
                const commentsCollRef = collection(db,  // reference to a not-yet existing 'Comments' collection under new doc
                    `Subforums/${subforumTitle}/Threads/${docRef.id}/Comments`);
                addDoc((db, commentsCollRef), {     // starts a collection for Comments in new Thread doc
                    createdBy: userAuth.currentUser.email, text: newThreadText, createdAt: serverTimestamp()
                })
                updatePostCount();
            });       
        }
    async function updatePostCount(){   // update post count of user to +1
        const userRef = doc(db, "Users", userAuth.currentUser.email);
                const docSnap = await getDoc(userRef);
                const userPosts = docSnap.data().posts;     // grabs the 'posts' field from the user document
                    //console.log("docsnap email: " + docSnap.data().email);    // debugging
                    updateDoc(userRef, { "posts": userPosts + 1});      // updates the 'posts' field to be incremented by 1

    }

    return (
                
        <View style={myStyles.create_thread}>
            
            <View style={myStyles.title_input_container}>
                <TextInput
                    style={ myStyles.titleInput }
                    placeholder='Enter title'
                    placeholderTextColor='black'
                    onChangeText={ onChangeTitle }
                    value={ newThreadTitle }
                    name='newTitleInput'
                    />
            </View>

            <ScrollView
                style={myStyles.thread_input_container}
            >
                <TextInput
                style={ myStyles.threadBodyInput }
                placeholder='Enter thread description'
                placeholderTextColor='black'
                onChangeText={ onChangeThreadText }
                value={ newThreadText }
                multiline={true}
                name='newThreadText'
                />
            </ScrollView>

            <TouchableOpacity  
                    onPress={() => createThread()}
                    style={myStyles.send_button}
            >
                <Text style={myStyles.create}>Create Thread</Text>
            </TouchableOpacity>
      </View>
    )

}
// const styles = StyleSheet.create({
//     body: {
//         alignItems: 'center',
//         flex: 1,
//         backgroundColor: 'white',
//         paddingVertical: 20,
//         multiline: 'true'
//     },
//     subforumList: {
//         alignItems: 'center'
//     },
//     subforumText:{
//         fontSize: 40,
//         color: 'rgba(185, 15, 5, 1)'
//     },
//     titleInput: {  //temp style for create thread
//         backgroundColor: "#505050",
//         color: 'white',
//         height: 40,
//         minWidth: 350,
//         maxWidth: 350,
//         borderWidth: 1
//     },
//     threadBodyInput: {  //temp style for create thread
//         flex: 1,
//         backgroundColor: "#505050",
//         color: 'white',
//         textAlignVertical: "top",
//         height: 300,
//         minWidth: 350,
//         maxWidth: 350,
//         borderWidth: 1
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