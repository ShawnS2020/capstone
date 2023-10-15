import React, { useState } from 'react';
import { Text, TextInput, FlatList, View, Button, StyleSheet, Image, Switch } from 'react-native';
import { getPlaces } from '../api/places';

export default function LocationScreen({ navigation }) {
  const [places, setPlaces] = useState(null);
  // isOriginCurrent is true if the user prefers to use their current location as the origin.
  // The alternative is to use the home location as the origin.
  const [isOriginCurrent, setIsOriginCurrent] = useState(true);
  const [radius, setRadius] = useState(10000);

  function handleSwitch() {
    setIsOriginCurrent(!isOriginCurrent);
  }

  async function handleClickLocation() {
    setPlaces(await getPlaces(isOriginCurrent, radius))
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
      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around' }}>
        <View style={{ alignItems: 'center' }}>
          <Text>{isOriginCurrent ? "Using Current Location" : "Using Home Location"}</Text>
          <Switch
            onValueChange={handleSwitch}
            value={isOriginCurrent}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text>Change radius</Text>
          {/* create a textInput for radius */}
          <TextInput
            style={{ height: 40, minWidth: 60, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => setRadius(text)}
            value={`${radius}`}
          />
        </View>
      </View>
      <Button
       onPress={ handleClickLocation }
       title="Load Places"
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