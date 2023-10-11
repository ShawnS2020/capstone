import React, { useState, useEffect } from 'react';
import { Text, FlatList, View, Button, StyleSheet, Image } from 'react-native';
import { getTextSearchOld } from '../api/places';

export default function LocationScreen({ navigation }) {
  const [places, setPlaces] = useState(null);
  
  async function handleClickLocation() {
    setPlaces(await getTextSearchOld())
  }

  function handleClickNav() {
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={places}
        renderItem={({ item }) => (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image
            style={{ width: 300, height: 300 }}
            source={{ uri: item.photoURL }}
          />
          <Text>{item.name}</Text>
          </View>
        )}
      />
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