import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavTabs from './NavTabs.js';
import ForumScreen from './ForumScreen.js';

const Stack = createNativeStackNavigator();

export default function NavStack() {
    return(
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
        </Stack.Navigator>

    );
}