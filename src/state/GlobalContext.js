import React, { createContext, useContext, useState } from 'react';
import { getPlaces, getDistanceAndDetails } from '../api/PlacesAPI';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [subforumTitle, setSubforumTitle] = useState('');
  const [threadTitle, setThreadTitle] = useState('');
  const [places, setPlaces] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function login() {
    setIsLoggedIn(true);
  };

  function logout () {
    setIsLoggedIn(false);
  };

  // This is the main function that loads places from the APIs.
  // Photos, distance from user, and website links are loaded in after the initial load.
  async function loadFeed() {
    setIsLoading(true);
    const places = await getPlaces();
    setIsLoading(false);
    if (places == null) {
      return;
    }
    setPlaces(places);
    console.log("Places set.");
    console.log("Getting distance and details.");
    // The FlatList containing places will re-render when places is updated.
    // Each place is updated, a new places array is created from it, and setPlaces is called with the new array
    // This causes many re-renders of the FlatList rather than having to wait for all places to be updated.
    // Wrap setPlaces in a promise so that we can await it.
    const setPlacesAsync = (i, updatedPlace) => new Promise(resolve => {
      setPlaces(prevPlaces => {
        const updatedPlaces = [...prevPlaces];
        updatedPlaces[i] = updatedPlace;
        resolve();
        return updatedPlaces;
      });
    });

    // For each place, call getDistanceAndDetails and use that new place to update places array.
    // We do this in chunks of 10 places at a time with a 5 sec delay to improve the perceived performance.
    const chunkSize = 10;
    let chunkI = 0;
    for (let i = 0; i < places.length; i += chunkSize) {
      const chunk = places.slice(i, i + chunkSize);
      const promises = chunk.map(async (place, j) => {
        const updatedPlace = await getDistanceAndDetails(place);
        return setPlacesAsync(i + j, updatedPlace);
      });
      Promise.all(promises);
      await new Promise(resolve => setTimeout(resolve, 3000));
      chunkI ++;
    }
  }

  return (
    <GlobalContext.Provider value={{
      isLoggedIn,
      login,
      logout,
      subforumTitle,
      setSubforumTitle,
      threadTitle,
      setThreadTitle,
      places,
      isLoading,
      loadFeed
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobal = () => useContext(GlobalContext);

export { GlobalProvider, useGlobal };