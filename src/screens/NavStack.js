import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavTabs from './NavTabs.js';
import ForumScreen from './ForumScreen.js';
import { inject } from 'mobx-react';

const Stack = createNativeStackNavigator();

export default inject('dummyAccountStore')(NavStack = ({ dummyAccountStore }) => {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Nav Tabs"
                component={NavTabs}
                initialParams={{ dummyAccountStore }}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Forum"
                component={ForumScreen}
            />
        </Stack.Navigator>

    );
});