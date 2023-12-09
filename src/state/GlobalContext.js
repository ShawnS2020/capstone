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
    console.log("Places set");
    await getDistanceAndDetails(places);
    console.log("Distance and details set");
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