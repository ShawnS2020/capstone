import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen.js';
import TestScreen from './screens/TestScreen.js';
import ForumHubScreen from './screens/ForumHubScreen.js';
import ForumScreen from './screens/ForumScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import Subforum from './components/Subforum.js';
import Thread from './components/Thread.js';

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
          name="Forum Hub"
          component={ForumHubScreen}
        />
        <Stack.Screen
          name="Forum"
          component={ForumScreen}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          name="Subforum"
          component={Subforum}
        />
        <Stack.Screen
          name="Thread"
          component={Thread}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}