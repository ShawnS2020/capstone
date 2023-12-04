import { useGlobal } from '../state/GlobalContext';
import React from 'react';
import { StyleSheet, Button, View, TextInput } from 'react-native';
import { db,  addDoc, collection, serverTimestamp, doc } from '../firebase';
import { Firestore } from 'firebase/firestore';

export default function CreateThreadScreen({ navigation }){

    const { subforumTitle, setThreadTitle } = useGlobal();
    const [newThreadTitle, onChangeTitle] = React.useState('');
    const [newThreadText, onChangeThreadText] = React.useState('');


    function handleClickThread(threadTitle, docID) {        // navigation function passes thread doc ID to load thread information in thread.js
        setThreadTitle(threadTitle);
        navigation.navigate('Thread', { passedThreadID: docID });
    }

    async function createThread(){
        const collectionRef = collection(db, `Subforums/${ subforumTitle }/Threads`);
        addDoc((db, collectionRef), { title: newThreadTitle, text: newThreadText, createdAt: serverTimestamp() })
            .then(docRef => { 
                handleClickThread(newThreadTitle, docRef.id);   // navigate to the newly created thread
                const commentsCollRef = collection(db,  // reference to a not-yet existing 'Comments' collection under new doc
                    `Subforums/${subforumTitle}/Threads/${docRef.id}/Comments`);
                addDoc((db, commentsCollRef), {     // starts a collection for Comments in new Thread doc
                    text: newThreadText, createdAt: serverTimestamp()
                })  
            });       

        }

    return (
                
        <View style={ styles.body }>
            <Button
                onPress={ () => createThread() } 
                title="Create Thread"
            />
            <TextInput
                style={ styles.titleInput }
                placeholder='Enter title'
                placeholderTextColor='white'
                onChangeText={ onChangeTitle }
                value={ newThreadTitle }
                name='newTitleInput'
                />
            <TextInput
                style={ styles.threadBodyInput }
                placeholder='Enter thread description'
                placeholderTextColor='white'
                onChangeText={ onChangeThreadText }
                multiline= {true}
                value={ newThreadText }
                name='newThreadText'
                />
      </View>
    )

}
const styles = StyleSheet.create({
    body: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: 20,
        multiline: 'true'
    },
    subforumList: {
        alignItems: 'center'
    },
    subforumText:{
        fontSize: 40,
        color: 'rgba(185, 15, 5, 1)'
    },
    titleInput: {  //temp style for create thread
        backgroundColor: "#505050",
        color: 'white',
        height: 40,
        minWidth: 350,
        maxWidth: 350,
        borderWidth: 1
    },
    threadBodyInput: {  //temp style for create thread
        flex: 1,
        backgroundColor: "#505050",
        color: 'white',
        textAlignVertical: "top",
        height: 300,
        minWidth: 350,
        maxWidth: 350,
        borderWidth: 1
    },
    button: {
        alignItems: 'center',
        width: '100%',
        height: 50,
        backgroundColor: 'rgba(180, 10, 30)',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 5,
        marginTop: 5
    },
    buttonContent: {
        color: 'gold',
        fontWeight: '900'
    }
});