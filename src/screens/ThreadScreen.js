import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Button, TextInput, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import { getAuth, db,  addDoc, getDocs, getDoc, doc, updateDoc, collection, serverTimestamp, orderBy, query } from '../firebase';
import { useGlobal } from '../state/GlobalContext';
import { useRoute } from "@react-navigation/native"
import { myStyles } from './styles/forum_stylesheet';

export default function ThreadScreen() {
    const userAuth = getAuth();
    const [commentText, onChangeCommentText] = useState("");
    const { subforumTitle, setThreadTitle, } = useGlobal();
    
    const [commentData, setCommentData] = useState([]);
    const flatListRef = useRef(null);
    const route = useRoute();
    const passedThreadID = route.params?.passedThreadID;    // taking passedThreadID from subforumScreen or CreateThreadScreen
                                                            // used below in updateCommentDocs()
    const commentCollRef = collection(db, `Subforums/${subforumTitle}/Threads/${passedThreadID}/Comments`);
    const orderedQuery = query(commentCollRef, orderBy('createdAt', 'asc')); 

    async function updateCommentDocs() {                                                  
        const querySnapshot = await getDocs(orderedQuery);
        const data = querySnapshot.docs.map((doc) => doc.data().text + " ");
            setCommentData(data);
}
    useEffect(() => {
        updateCommentDocs();
    }, []);

    async function createComment(){
        addDoc((db, commentCollRef), { createdBy: userAuth.currentUser.email, text: commentText, createdAt: serverTimestamp() });
                updatePostCount();
                updateCommentDocs();
    }       
    async function updatePostCount(){   // update post count of user to +1
        const userRef = doc(db, "Users", userAuth.currentUser.email);
                const docSnap = await getDoc(userRef);
                const userPosts = docSnap.data().posts;     // grabs the 'posts' field from the user document
                    //console.log("docsnap email: " + docSnap.data().email);    // debugging
                    updateDoc(userRef, { "posts": userPosts + 1});      // updates the 'posts' field to be incremented by 1

    }

    // function handleContentSizeChange() {
    //     flatListRef.current.scrollToEnd();
    // }

    return (     
        <View style={ myStyles.body }>
            {/* don't need the flatlist */}
            {/* <FlatList
                ref = { flatListRef }
                style = { { flex: 1, backgroundColor: "#C0C0C0" } }
                contentContainerStyle={styles.chatContainer}
                data={ commentData }
                renderItem={ ({ item }) => (
                    <Text style={ styles.chat }>{item}</Text>
                )}
                onContentSizeChange={ handleContentSizeChange }
            /> */}
            <ScrollView>
                {commentData.map((element, index) => (       // loop through array of comments
                    <View
                    style={myStyles.chatContainer}
                    key={ index } // Use a unique key for each button
                    >   
                        <Text style={myStyles.chat}>{element}</Text>
                    </View>
                ))}
            </ScrollView>
                
            <View style={ myStyles.bottomBar }>
                <TextInput
                    style={ myStyles.textBar }
                    placeholder='Enter a comment'
                    onChangeText={(text) => { onChangeCommentText(text); } }
                    // onContentSizeChange={ handleContentSizeChange }
                    value={ commentText }
                    multiline= {true}
                    name="textInput"
                />
                {/* <Button
                    onPress={ () => createComment() } 
                    title="Send"
                /> */}

                <TouchableOpacity  
                    onPress={() => createComment()}
                    style={myStyles.send_button}
                >
                    <Text style={myStyles.send}>Send</Text>
                </TouchableOpacity>
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
        minHeight: 40,
        maxHeight: 300,
        minWidth: 240,
        maxWidth: 250,
        paddingHorizontal: 16,
        borderRadius: 24,
        marginHorizontal: 8,
        multiline: 'true',
    }
})