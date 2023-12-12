import { useState } from 'react';
import { Text, FlatList, View, Button, StyleSheet, Image, Linking, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useGlobal } from '../state/GlobalContext';
import PlacesMenu from '../components/PlacesMenu';
import StarRating from '../components/StarRating';

export default function PlacesScreen({ isMenuOpen }) {
  const { places, isLoading, loadFeed } = useGlobal();
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [sortType, setSortType] = useState('none');
  const [sortDirection, setSortDirection] = useState('asc.');
  const [enabledFilters, setEnabledFilters] = useState([]);

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
        extraData={places}
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
              {/* if place.distance is null then indicate loading */}
              <Text>{place.distance == null ? 'loading distance...' : place.distance + ' miles'}</Text>
              {/* if place.website is null then indicate loading */}
              {place.website == null ?
                <Text>loading website...</Text> :
                <TouchableOpacity onPress={() => Linking.openURL(place.website)}>
                  <Text style={styles.websiteLink}>{place.website}</Text>
                </TouchableOpacity>
              }
            </View>
          </View>
        )}
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
    paddingVertical: 8,
    backgroundColor: '#FFFFF0',
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