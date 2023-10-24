import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList } from 'react-native';
import {FIREBASE_DB} from '../firebaseConfig';
// import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

export default function ForumScreen({ navigation }) {

    const [texts, setTexts] = React.useState([]);
    const [text, onChangeText] = React.useState('');
    // const [loading, setLoading] = React.useState(true);
    // const fbRef = doc(collection(FIREBASE_DB, 'test')); //need to fix to reference firestore collections
    const flatListRef = useRef(null);

    // will update real-time the list of documents in a given collection
    // need to create a firestore collection component that can store all the info
    // and be used as a sort-of constructor
    /*useEffect(() => {
        return fbRef.onSnapshot(querySnapshot => {
            const list = [];
            querySnapshot.forEach(doc => {
                const {title, complete} = doc.data();
                list.push({
                    id: doc.id,
                    title,
                    complete,
                });
            });
            setTexts(list);
            if (loading) {
                setLoading(false);
            }
        });
    }, []);
    */

    const addTxt = async () => {
        const doc = addDoc(collection(FIREBASE_DB, 'test'), {title: text, done: false});
        console.log("Testing complete", doc)
    }

    function handleClickSend() {
        addTxt();
        setTexts([...texts, text]);
        console.log(text);
    }

    function handleContentSizeChange() {
        flatListRef.current.scrollToEnd();
    }

    return(
        <View style={ styles.container }>
            <FlatList
                ref = { flatListRef }
                style = {{ flex: 1, backgroundColor: "#C0C0C0" }}
                contentContainerStyle={ styles.body }
                data={texts}
                // data={ txt }
                renderItem={ ({ item }) => (
                    <Text style={ styles.bodyText }>{ item }</Text>
                )}
                onContentSizeChange={handleContentSizeChange}
            />
            <View style={ styles.bottomBar }>
                <TextInput
                    style={ styles.textBar }
                    placeholder='Enter text'
                    onChangeText={onChangeText}
                    //onChangeText={(text) => setTxt(txt)}
                    value={text}
                    name="textInput"
                />
                <Button
                    onPress={handleClickSend}
                    // onPress={handleClickSend}
                    title="Send"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        color: "#FFFFFF",
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    bodyText: {
        backgroundColor: "#00A0A0",
        margin: 10,
        padding: 10,
        borderRadius: 5
    },
    bottomBar: {
        backgroundColor: "#101010",
        paddingVertical: 20,
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    textBar: {
        backgroundColor: "#505050",
        color: "#FFFFFF",
        height: 40,
        minWidth: 150,
        maxWidth: 250,
        borderWidth: 1
    }
});