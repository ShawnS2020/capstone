import React, { useState } from 'react';
import { Text, TextInput, FlatList, View, Button, StyleSheet, Image, Linking, TouchableOpacity, Switch } from 'react-native';
import { getPlaces } from '../api/PlacesAPI';
import testPlaces from '../api/TestPlaces';
import PlacesMenu from '../components/PlacesMenu';
import StarRating from '../components/StarRating';

export default function PlacesScreen({ isMenuOpen }) {
  const [places, setPlaces] = useState(null);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [sortType, setSortType] = useState('none'); // ['none', 'hobby', 'rating', 'review count', 'distance']
  const [sortDirection, setSortDirection] = useState('asc.');
  // isOriginCurrent is true if the user prefers to use their current location as the origin.
  // The alternative is to use the home location as the origin.
  const [isOriginCurrent, setIsOriginCurrent] = useState(false);
  const [radius, setRadius] = useState(10000);
  const [enabledFilters, setEnabledFilters] = useState([]);

  function handleSwitch() {
    setIsOriginCurrent(!isOriginCurrent);
  }

  function handleClickSortType(sortType) {
    setSortType(sortType);
    setIsSortDropdownOpen(!isSortDropdownOpen);
  }

  function handleClickSortDirection() {
    setSortDirection(sortDirection === 'asc.' ? 'desc.' : 'asc.');
  }

  function handleClickFilterItem(filter) {
    if (enabledFilters.includes(filter)) {
      setEnabledFilters(enabledFilters.filter(f => f !== filter));
    } else {
      setEnabledFilters([...enabledFilters, filter]);
    }
  }

  async function handleClickLocation() {
    // Un-comment the following two lines to use test data.
    // setPlaces(testPlaces);
    // return;
    setPlaces(await getPlaces(isOriginCurrent, radius))
  }

  return (
    <View style={styles.container}>
      { isMenuOpen ? 
        <PlacesMenu 
          handleClickSortType={handleClickSortType}
          handleClickSortDirection={handleClickSortDirection}
          handleClickFilterItem={handleClickFilterItem}
          isSortDropdownOpen={isSortDropdownOpen}
          sortType={sortType}
          sortDirection={sortDirection}
          enabledFilters={enabledFilters}
        /> : null
      }
      {/* Create a FlatList for each place */}
      <FlatList
        data={places}
        renderItem={({ item: place }) => (
          <View style={styles.placeContainer}>
            <Text style={styles.placeHobby}>{place.hobby.charAt(0).toUpperCase() + place.hobby.slice(1)}</Text>
            {/* Create a FlatList for each photo in place.photos */}
            {!('photoUrls' in place) ? (
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
              ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
              ListHeaderComponent={() => <View style={{ width: 8 }} />}
              ListFooterComponent={() => <View style={{ width: 8 }} />}
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
              <TouchableOpacity onPress={() => Linking.openURL(place.website)}>
                <Text style={styles.websiteLink}>{place.website}</Text>
              </TouchableOpacity>
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
    paddingVertical: 8,
    backgroundColor: '#FFF',
  },
  placeHobby: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 8,
  },
  photo: {
    width: 140,
    height: 140,
    borderRadius: 10,
  },
  placeDetails: {
    margin: 8,
  },
  ratingsLine: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  websiteLink: {
    color: '#0070E0',
  },
});