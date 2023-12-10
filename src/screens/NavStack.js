import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useGlobal } from '../state/GlobalContext.js';
import NavTabs from './NavTabs.js';
import LoginScreen from './LoginScreen.js';
import ThreadScreen from './ThreadScreen.js';
import SetupScreen1 from './SetupScreen1.js';
import SetupScreen2 from './SetupScreen2.js';
import SetupScreen3 from './SetupScreen3.js';
import SetupScreen4 from './SetupScreen4.js';
import PlacesScreen from './PlacesScreen.js';
import CreateThreadScreen from './CreateThreadScreen.js';

const Stack = createNativeStackNavigator();

export default function NavStack() {
    const { threadTitle } = useGlobal();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
            />
            <Stack.Screen
                name="Setup 1"
                component={SetupScreen1}
                options={{ title: "" }}
            />
            <Stack.Screen
                name="Setup 2"
                component={SetupScreen2}
                options={{ title: "" }}
            />
            <Stack.Screen
                name="Setup 3"
                component={SetupScreen3}
                options={{ title: "" }}
            />
            <Stack.Screen
                name="Setup 4"
                component={SetupScreen4}
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
                name="Create Thread"
                component={ CreateThreadScreen }
            />
            <Stack.Screen
                name="PlacesScreen"
                component={PlacesScreen}
                options={{ headerShown: true }}
            />
        </Stack.Navigator>
    );
}