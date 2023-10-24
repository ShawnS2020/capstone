import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList } from 'react-native';
import {FIREBASE_DB} from '../firebaseConfig';
// import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

export default function ForumScreen({ navigation }) {

    const [texts, setTexts] = React.useState([]);
    const [text, onChangeText] = React.useState('');
    const flatListRef = useRef(null);
    //const [txt1, setTxt1] = useState<any[koala]>([]);
    //const [txt, setTxt] = useState('');

    useEffect(() => {}, [])

    const addTxt = async () => {
        const doc = await addDoc(collection(FIREBASE_DB, 'posts'), {title: text, done: false});
        onChangeText(text);
        console.log("Testing", doc);
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
                />
                <Button
                    onPress={handleClickSend}
                    // onPress={handleClickSend}
                    title="Send"
                    // disabled={txt===''}
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