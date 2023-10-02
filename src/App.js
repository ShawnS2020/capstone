import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen.js';
import TestScreen from './screens/TestScreen.js';
import ActivityScreen from './screens/ActivityScreen.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="Test"
          component={TestScreen}
        />
         <Stack.Screen 
        name="ActivityScreen" 
        component={ActivityScreen}
        />
        
       
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}