import React, { useState } from 'react';
import { Text, TextInput, FlatList, View, Button, StyleSheet, Image, Linking, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getPlaces } from '../api/PlacesAPI';
import PlacesMenu from '../components/PlacesMenu';
import StarRating from '../components/StarRating';
import testPlaces from '../api/TestPlaces';

export default function PlacesScreen({ isMenuOpen }) {
  const [isLoading, setIsLoading] = useState(false);
  const [places, setPlaces] = useState(null);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [sortType, setSortType] = useState('none');
  const [sortDirection, setSortDirection] = useState('asc.');
  const [enabledFilters, setEnabledFilters] = useState([]);
  const [radius, setRadius] = useState(10000);

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

  function handleClickApplySortAndFilters() {
    /***
     * 
     * Logic for applying sort and filters to places
     * 
     * ***/
  }

  async function handleClickLoadFeed() {
    setIsLoading(true);
    const places = await getPlaces(radius);
    setIsLoading(false);
    if (places == null) {
      return;
    }
    setPlaces(places);
  }

  function handleClickLoadFeedTestData() {
    setPlaces(testPlaces);
  }

  return (
    <View style={styles.container}>
      { isMenuOpen ? 
        <PlacesMenu 
          handleClickSortType={handleClickSortType}
          handleClickSortDirection={handleClickSortDirection}
          handleClickFilterItem={handleClickFilterItem}
          handleClickApplySortAndFilters={handleClickApplySortAndFilters}
          isSortDropdownOpen={isSortDropdownOpen}
          sortType={sortType}
          sortDirection={sortDirection}
          enabledFilters={enabledFilters}
        /> : null
      }
      { isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : null }
      {/* Create a FlatList for each place */}
      <FlatList
        data={places}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
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
              <Text>{place.distance} miles</Text>
              <TouchableOpacity onPress={() => Linking.openURL(place.website)}>
                <Text style={styles.websiteLink}>{place.website}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around' }}>
        <View style={{ alignItems: 'center' }}>
          <Text>Change radius</Text>
          {/* create a textInput for radius */}
          <TextInput
            style={{ height: 40, minWidth: 60, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => setRadius(text)}
            value={`${radius}`}
          />
        </View>
      <Button
       onPress={ handleClickLoadFeed }
       title="Load Places (API)"
      />
      <Button
       onPress={ handleClickLoadFeedTestData }
       title="Load test data"
      />
      </View>
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