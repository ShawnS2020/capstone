import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Button, TextInput, Text, View, FlatList } from 'react-native';
import { getAuth, db,  addDoc, getDocs, getDoc, doc, collection, Timestamp } from '../firebase';
import { useGlobal } from '../state/GlobalContext';
import { useRoute } from "@react-navigation/native"

export default function ThreadScreen() {
    const [text, onChangeText] = useState("");
    const { subforumTitle, setThreadTitle, } = useGlobal();
    
    const [commentData, setCommentData] = useState([]);
    const flatListRef = useRef(null);
    const route = useRoute();
    const passedThreadID = route.params?.passedThreadID;    // taking passedThreadID from subforumScreen or CreateThreadScreen
                                                            // used below in updateCommentDocs()
    async function updateCommentDocs() {                                                  
            const collectionRef = collection(db, `Subforums/${subforumTitle}/Threads/${passedThreadID}/Comments`);
            const querySnapshot = await getDocs(collectionRef);
            const data = querySnapshot.docs.map((doc) => doc.data().text + " ");
                setCommentData(data);
    }
    useEffect(() => {
        updateCommentDocs();
    }, []);

    function handleContentSizeChange() {
        flatListRef.current.scrollToEnd();
    }

    return (     
        <View style={ styles.body }>
            <FlatList
                ref = { flatListRef }
                style = { { flex: 1, backgroundColor: "#C0C0C0" } }
                contentContainerStyle={styles.chatContainer}
                data={ commentData }
                renderItem={ ({ item }) => (
                    <Text style={ styles.chat }>{item}</Text>
                )}
                onContentSizeChange={ handleContentSizeChange }
            />
            {commentData.map((element, index) => (       // loop through array of comments
                <View
                key={ index } // Use a unique key for each button
                
                >   
                    <Text>{element}</Text>
                </View>
            ))}
            <View style={ styles.bottomBar }>
                <TextInput
                    style={ styles.textBar }
                    placeholder='Enter text'
                    onChangeText={(text) => { onChangeText(text); flatListRef.current.scrollToEnd()} }
                    value={ text }
                    name="textInput"
                />
                <Button
                    onPress={ () => dbWrite() } 
                    title="Send"
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'white',
    },
    chatContainer: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end'

    },
    chat: {
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
        justifyContent: 'flex-end',
    },
    textBar: {
        backgroundColor: "#505050",
        color: "#FFFFFF",
        height: 40,
        minWidth: 240,
        maxWidth: 250,
        paddingHorizontal: 16,
        borderRadius: 24,
        marginHorizontal: 8,
    }
});