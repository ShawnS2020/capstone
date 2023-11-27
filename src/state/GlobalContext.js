import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [subforumTitle, setSubforumTitle] = useState('');
  const [threadTitle, setThreadTitle] = useState('');

  function login() {
    setIsLoggedIn(true);
  };

  function logout () {
    setIsLoggedIn(false);
  };

  return (
    <GlobalContext.Provider value={{ isLoggedIn, login, logout, subforumTitle, setSubforumTitle, threadTitle, setThreadTitle }}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobal = () => useContext(GlobalContext);

export { GlobalProvider, useGlobal };