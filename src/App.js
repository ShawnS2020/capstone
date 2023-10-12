import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'mobx-react';
import counterScreenStore from './state/CounterScreenStore.js';
import dummyAccountStore from './state/DummyAccountStore.js';
import HomeScreen from './screens/HomeScreen.js';]
import ActivityScreen from './screens/ActivityScreen.js';
import LocationScreen from './screens/LocationScreen.js';
import CounterScreen from './screens/CounterScreen.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider counterScreenStore={counterScreenStore} dummyAccountStore={dummyAccountStore}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            initialParams={{ counterScreenStore, dummyAccountStore }}
          />
          <Stack.Screen
            name="Counter"
            component={CounterScreen}
            initialParams={{ counterScreenStore }}
          />
          <Stack.Screen
            name="Location"
            component={LocationScreen}
          />
          <Stack.Screen 
            name="ActivityScreen" 
            component={ActivityScreen}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </Provider>
  );
}