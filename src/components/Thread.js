import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList } from 'react-native';
import { getAuth, db,  addDoc, getDoc, getDocs, setDoc, doc, collection, onSnapshot, query } from '../firebase';

export default function Thread({ navigation }) {
    //placeholder return
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
            </View>
            )
}