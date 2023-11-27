import React from 'react';
import {  TouchableOpacity, StyleSheet, Button, TextInput, Text, View, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function ThreadScreen({ navigation }) {

    const route = useRoute();   
    const passedVar = route.params?.passedVar;      // variable is passed to ThreadScreen from SubforumScreen
                                                    // this variable will be used to load a specific thread
    return(     
        
                
        <View style={ styles.container }>

            <View style = {styles.threadCont}>
                <Text style = {styles.threadText}>
                    { passedVar } converted to Thread Name
                </Text>
            </View>
            <View style = {styles.commentStyle}>
                <Text> Initial thread description/comment by author here. </Text>
            </View>
            <View style = {styles.commentStyle}>
                <Text> Example comment provided by another user </Text>
            </View>
        
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    commentStyle: {
        fontSize: 20,
        backgroundColor: 'rgba(183, 13, 1, .5)',
        color: 'white',
        fontWeight: '100',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
    }, 
    threadCont: {
        alignItems: 'center',
        flexDirection: 'row', 
    },
    threadText:{
        fontSize: 40,
        color: 'rgba(180, 10, 1, .8)',
        fontWeight: 'bold',
    }
    })