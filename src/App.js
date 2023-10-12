import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'mobx-react';
import counterScreenStore from './state/CounterScreenStore.js';
import dummyAccountStore from './state/DummyAccountStore.js';
import HomeScreen from './screens/HomeScreen.js';
import ActivityScreen from './screens/ActivityScreen.js';
import LocationScreen from './screens/LocationScreen.js';
import CounterScreen from './screens/CounterScreen.js';

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider counterScreenStore={counterScreenStore} dummyAccountStore={dummyAccountStore}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen 
            name="Activity Screen" 
            component={ActivityScreen}
            initialParams={{ dummyAccountStore }}
          />
          <Tab.Screen
            name="Location"
            component={LocationScreen}
          />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </Provider>
  );
}