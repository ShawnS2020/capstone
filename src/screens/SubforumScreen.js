import React from 'react';
import {  TouchableOpacity, StyleSheet, Button, TextInput, Text, View, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function SubforumScreen({ navigation }) {

    const route = useRoute();   
    const passedVar = route.params?.passedVar;      // variable is passed to SubforumScreen from ForumScreen
                                                    // this variable will be used to load a specific subforum document
    return(        
                <View style={ styles.container }>

                <View style = {styles.subforumCont}>
                    <Text style = {styles.subforumText}>
                         { passedVar } Subforum
                    </Text>
                </View>
                <Button
                    onPress={() => navigation.navigate('Thread', { passedVar : 'Example Thread DocID' })} // get docID by ref 
                    title = "Example Thread"
                />
                <Button
                    onPress={() => navigation.navigate('Thread', { passedVar : 'Example Thread DocID' })} // get docID by ref 
                    title = "Another Example Thread"
                />
        
              </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: 20,
    },
    subforumCont: {
        alignItems: 'center',
        flexDirection: 'row', 
    },
    subforumText:{
        fontSize: 40,
        color: 'rgba(180, 10, 1, .8)',
        fontWeight: '100',
    },
    buttonCont: {
        alignItems: 'center',
        width: '40%',
        justifyContent: 'center',
        marginTop: 20,
    },
    button: {
        alignItems: 'center',
        width: '100%',
        height: 50,
        backgroundColor: 'rgba(180, 10, 1, .8)',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 5,
        marginTop: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: '900',
    },
    })