import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useGlobal } from '../state/GlobalContext.js';
import NavTabs from './NavTabs.js';
import LoginScreen from './LoginScreen.js';
import ThreadScreen from './ThreadScreen.js';

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
        </Stack.Navigator>
    );
}