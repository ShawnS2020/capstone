import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useGlobal } from '../state/GlobalContext.js';
import NavTabs from './NavTabs.js';
import LoginScreen from './LoginScreen.js';
import ThreadScreen from './ThreadScreen.js';
import SetUpScreen1 from './SetUpScreen1.js';
import SetUpScreen2 from './SetUpScreen2.js';
import SetUpScreen3 from './SetUpScreen3.js';
import PlacesScreen from './PlacesScreen.js';

const Stack = createNativeStackNavigator();

export default function NavStack() {
    const { isLoggedIn, threadTitle } = useGlobal();
    const [initialRouteName, setInitialRouteName] = useState('Login');

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
            />
            <Stack.Screen
                name="Set Up 1"
                component={SetUpScreen1}
                options={{ title: "" }}
            />
            <Stack.Screen
                name="Set Up 2"
                component={SetUpScreen2}
                options={{ title: "" }}
            />
            <Stack.Screen
                name="Set Up 3"
                component={SetUpScreen3}
                options={{ title: "" }}
            />
            <Stack.Screen
                name="Nav Tabs"
                component={NavTabs}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Thread"
                component={ThreadScreen}
                options={{ title: threadTitle }}
            />
            <Stack.Screen
                name="PlacesScreen"
                component={PlacesScreen}
                options={{ headerShown: true }}
            />
        </Stack.Navigator>
    );
}