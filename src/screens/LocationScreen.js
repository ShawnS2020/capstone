import React, { useState } from 'react';
import { Text, TextInput, FlatList, View, Button, StyleSheet, Image, Switch } from 'react-native';
import { getPlaces } from '../api/places';
import testPlaces from '../api/test_places';
import StarRating from '../components/star_rating';

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
    // setPlaces(await getPlaces(isOriginCurrent, radius))
    setPlaces(testPlaces);
  }

  return (
    <View style={styles.container}>
      {/* <StarRating rating={2.2} /> */}
      {/* Create a FlatList for each place */}
      <FlatList
        data={places}
        renderItem={({ item: place }) => (
          <View style={styles.placeContainer}>
            {/* Create a FlatList for each photo in place.photos */}
            {place.photoUrls.length == 0 ? (
              <Image
                style={styles.photo}
                source={require('../../assets/photo_placeholder.png')}
              />
            ) : (
            <FlatList
              data={place.photoUrls}
              renderItem={({ item: photoUrl }) => (
                <Image
                  style={styles.photo}
                  source={{ uri: photoUrl }}
                />
              )}
              horizontal={true}
            />
            )}
            <View style={styles.placeDetails}>
              <Text>{place.name}</Text>
              <View style={styles.ratingsLine}>
                <Text>{place.rating}</Text>
                <StarRating rating={place.rating} />
                <Text>({place.user_ratings_total})</Text>
              </View>
              <Text>{place.formatted_address}</Text>
            </View>
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
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
  placeContainer: {
    alignItems: 'left',
    marginVertical: 8,
    padding: 8,
    backgroundColor: '#FFF',
  },
  photo: {
    width: 140,
    height: 140,
    borderRadius: 10,
    marginLeft: 8,
    marginRight: 2,
  },
  placeDetails: {
    margin: 8,
  },
  ratingsLine: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});