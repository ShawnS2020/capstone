import * as React from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList } from 'react-native';

export default function ForumScreen({ navigation }) {
    const [text, onChangeText] = React.useState('');
    const [texts, setTexts] = React.useState([]);

    function handleClickSend() {
        console.log(text);
        setTexts([text, ...texts]);
    }

    return(
        <View style={ styles.container }>
            <View style={ styles.body }>
                <FlatList
                    data={ texts }
                    renderItem={ ({ item }) => <Text>{ item }</Text> }
                    // keyExtractor={ item => item }
                />
            </View>
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
        backgroundColor: "#C0C0C0",
        color: "#FFFFFF",
        width: "100%",
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end' 
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold'
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