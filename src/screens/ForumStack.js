import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useGlobal } from '../state/GlobalContext.js';
import ForumHubScreen from './ForumHubScreen.js';
import SubforumScreen from './SubforumScreen.js';

const Stack = createNativeStackNavigator();

export default function ForumStack() {
    const { subforumTitle } = useGlobal();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name = "Forum Hub"
                component={ForumHubScreen}
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