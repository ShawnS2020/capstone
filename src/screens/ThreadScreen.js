import { useState, useRef } from 'react';
import { StyleSheet, Button, TextInput, Text, View, FlatList } from 'react-native';
import { useGlobal } from '../state/GlobalContext';

export default function ThreadScreen() {
    const [text, onChangeText] = useState("");
    const { threadTitle } = useGlobal();
    const flatListRef = useRef(null);
    const results = [`Welcome to ${threadTitle}!`, "This is a comment.", "This is another comment.", "This is a third comment."];
    // Push 10 more strings to results array
    for (let i = 0; i < 10; i++) {
        results.push(`This is comment number ${i + 4}.`);
    }

    function handleContentSizeChange() {
        flatListRef.current.scrollToEnd();
    }

    return (     
        <View style={ styles.body }>
            <FlatList
                ref = { flatListRef }
                style = { { flex: 1, backgroundColor: "#C0C0C0" } }
                contentContainerStyle={styles.chatContainer}
                data={results}
                renderItem={ ({ item }) => (
                    <Text style={ styles.chat }>{item}</Text>
                )}
                onContentSizeChange={ handleContentSizeChange }
            />
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