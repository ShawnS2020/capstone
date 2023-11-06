import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList } from 'react-native';
import { db,  addDoc, getDoc, getDocs, setDoc, doc, collection, onSnapshot, query } from '../firebase';
// import { initializeAuth, getReactNativePersistence } from 'firebase/auth';


export default function ForumScreen({ navigation }) {
    const [text, onChangeText] = React.useState('');
    const [texts, setTexts] = React.useState([]);
    // const [loading, setLoading] = React.useState(true);
    // const fbRef = doc(collection(db, 'test')); //need to fix to reference firestore collections
    const flatListRef = useRef(null);

    const dbWrite = async () => {
        const docPush = addDoc(collection(db, 'test'), {title: text, done: false});
        console.log("Testing complete", docPush)

    }

    const printCol = () => {
        const testCollection = collection(db, "test");     // create a reference for the collection 'test' in firestore
        const results = [];
        getDocs(testCollection).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log("Document ID: ", doc.id);
                const data = doc.data();    // doc.data() is an object for all data in a document
                console.log(doc.data().title);  // doc.data().title  gives the data for 'title' field for a document
                results.push(data, doc.data().title);
            });
        }).catch((error) => {
            console.error("Error getting docs: ", error);
        });
                // to show the data on the UI: can create any list/array object, and within the forEach loop above 
                // can append the data to the list (seen in results.push(data, doc.data().title));)
                // then can return the list from a function, can't do it from a const 
    }

    // function handleClickSend() {
    //     console.log(text);
    //     setTexts([...texts, text]);
    // }

    function handleContentSizeChange() {
        flatListRef.current.scrollToEnd();
    }

    return(
        <View style={ styles.container }>
            <FlatList
                ref = { flatListRef }
                style = {{ flex: 1, backgroundColor: "#C0C0C0" }}
                contentContainerStyle={ styles.body }
                data={ texts }
                renderItem={ ({ item }) => (
                    <Text style={ styles.bodyText }>{ item }</Text>
                )}
                onContentSizeChange={handleContentSizeChange}
            />
            <View style={ styles.bottomBar }>
            <Button
                    onPress={printCol}  // this button returns data to the console as of now
                    title="Show Collection"
                    type="submit"
                />
                <TextInput
                    style={ styles.textBar }
                    onChangeText={onChangeText}
                    value={text}
                    name="textInput"
                />
                <Button
                    onPress={ () => dbWrite()} 
                    title="Send"
                    type="submit"
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