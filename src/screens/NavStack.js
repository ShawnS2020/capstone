import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from '../state/AuthContext';
import NavTabs from './NavTabs.js';
import ForumScreen from './ForumScreen.js';
import LoginScreen from './LoginScreen.js';
import SubforumScreen from './SubforumScreen.js';
import ThreadScreen from './ThreadScreen.js';

const Stack = createNativeStackNavigator();

export default function NavStack() {
    return (
        <AuthProvider>
            <Stack.Navigator>
                <Stack.Screen
                    name="Nav Tabs"
                    component={NavTabs}
                    options={{ headerShown: false }}
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
                    component={SubforumScreen}
                />
                <Stack.Screen
                    name="Thread"
                    component={ThreadScreen}
                />
            </Stack.Navigator>
        </AuthProvider>
    );
}