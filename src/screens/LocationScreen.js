import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import getPlaces from '../api/places';

export default function LocationScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [text, setText] = useState("Waiting...");
  const [errorMsg, setErrorMsg] = useState(null);
  
  async function handleClickLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);

    if (errorMsg) {
      setText(errorMsg);
    } else if (location) {
      setText(JSON.stringify(location));
    }

    console.log(await getPlaces())
  }

  function handleClickNav() {
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Current position: {text}</Text>
      <Button
       onPress={ handleClickLocation }
       title="Request Location"
      />
      <Button
       onPress={ handleClickNav }
       title="To Home Screen"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});