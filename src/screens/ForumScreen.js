import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList } from 'react-native';
import { getAuth, db,  addDoc, getDoc, getDocs, setDoc, doc, collection, onSnapshot, query } from '../firebase';

export default function ForumScreen({ navigation }) {

    const auth = getAuth();    
    const [text, onChangeText] = React.useState('');
    // const [loading, setLoading] = React.useState(true);      for displaying documents from firestore
    const flatListRef = useRef(null);

    const dbWrite = async () => {
        const docPush = addDoc(collection(db, 'test'), {title: text, done: false});
        console.log("Testing complete", docPush)
        updateDocs();
    }

    const testCollection = collection(db, "test");     // create a reference for the collection 'test' in firestore
    const results = [];

    function updateDocs(){
    getDocs(testCollection).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            //console.log("Document ID: ", doc.id);
            const data = doc.data();    // doc.data() is an object for all data in a document
            results.push(data.title + " ");
        });
    }).catch((error) => {
        console.error("Error getting docs: ", error);
    });}

    updateDocs();
    
    function handleContentSizeChange() {
        flatListRef.current.scrollToEnd();
    }

    return(
        <View style={ styles.container }>
            <FlatList
                ref = { flatListRef }
                style = {{ flex: 1, backgroundColor: "#C0C0C0" }}
                contentContainerStyle={ styles.body }
                data={ results }
                renderItem={ ({ item }) => (
                    <Text style={ styles.bodyText }>{ results }</Text>
                )}
                onContentSizeChange={handleContentSizeChange}
            />
            <View>
                <Button
                    onPress={() => navigation.navigate('Subforum', { passedVar : 'Sports' })}
                    title="Sports subforum"
                />
            </View>
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
                    onPress={ () => dbWrite()} 
                    title="Send"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        color: 'white',
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