import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'mobx-react';
import dummyAccountStore from './state/DummyAccountStore.js';

import NavStack from './screens/NavStack.js';

export default function App() {
  return (
    <Provider dummyAccountStore={dummyAccountStore}>
      <NavigationContainer>
        <NavStack />
        <StatusBar style="auto" />
      </NavigationContainer>
    </Provider>
  );
}