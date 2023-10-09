// import * as React from 'react';
import React, { useRef } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList } from 'react-native';

export default function ForumScreen({ navigation }) {
    const [text, onChangeText] = React.useState('');
    const [texts, setTexts] = React.useState([]);
    const flatListRef = useRef(null);


    function handleClickSend() {
        console.log(text);
        setTexts([...texts, text]);
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
                data={ texts }
                renderItem={ ({ item }) => (
                    <Text style={ styles.bodyText }>{ item }</Text>
                )}
                onContentSizeChange={handleContentSizeChange}
            />
            <View style={ styles.bottomBar }>
                <TextInput
                    style={ styles.textBar }
                    onChangeText={onChangeText}
                    value={text}
                />
                <Button
                    onPress={ handleClickSend }
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
        width: 100,
        borderWidth: 1
    }
});