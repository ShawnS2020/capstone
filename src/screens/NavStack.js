import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useGlobal } from '../state/GlobalContext.js';
import NavTabs from './NavTabs.js';
import LoginScreen from './LoginScreen.js';
import ThreadScreen from './ThreadScreen.js';
import SetupScreen from './SetupScreen.js';
import SetupScreen1 from './SetupScreen1.js';
import SetupScreen2 from './SetupScreen2.js';
import PlacesScreen from './PlacesScreen.js';

const Stack = createNativeStackNavigator();

export default function NavStack() {
    const { threadTitle } = useGlobal();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Nav Tabs"
                component={NavTabs}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
            />
            <Stack.Screen
                name="Thread"
                component={ThreadScreen}
                options={{ title: threadTitle }}
            />
            {/* // new test screen// */}
            <Stack.Screen
                name="SetupScreen"
                component={SetupScreen}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="SetupScreen1"
                component={SetupScreen1}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="SetupScreen2"
                component={SetupScreen2}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="PlacesScreen"
                component={PlacesScreen}
                options={{ headerShown: true }}
            />
        </Stack.Navigator>
    );
}