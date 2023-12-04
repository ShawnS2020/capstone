import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useGlobal } from '../state/GlobalContext.js';
import SubforumScreen from './SubforumScreen.js';
import ForumHubLoggedIn from './ForumHubScreen.js';
import LoginScreen from './LoginScreen.js';


const Stack = createNativeStackNavigator();

export default function ForumStack() {
    const { isLoggedIn, subforumTitle } = useGlobal();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name = "Forum Hub"
                component={isLoggedIn ? ForumHubLoggedIn : LoginScreen}
                options={{ title: "Forums" }}
            />
            <Stack.Screen
                name="Subforum"
                component={SubforumScreen}
                options={{ title: subforumTitle }}
            />
        </Stack.Navigator>
    );
}