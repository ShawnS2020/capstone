import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'mobx-react';
import { GlobalProvider } from './state/GlobalContext.js';
import guestAccountStore from './state/GuestAccountStore.js';

import NavStack from './screens/NavStack.js';

export default function App() {
  return (
    <Provider guestAccountStore={guestAccountStore}>
      <GlobalProvider>
        <NavigationContainer>
          <NavStack />
          <StatusBar style="auto" />
        </NavigationContainer>
      </GlobalProvider>
    </Provider>
  );
}