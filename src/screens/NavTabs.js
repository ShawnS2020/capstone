import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';

import ForumHubScreen from './ForumHubScreen.js';
import ActivityScreen from './ActivityScreen.js';
import LocationScreen from './LocationScreen.js';
import AccountScreen from './AccountScreen.js';

const Tab = createBottomTabNavigator();

export default function NavTabs() {
    return(
        <Tab.Navigator
            initialRouteName="Activities"
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'black',
                tabBarActiveBackgroundColor: 'black',
                tabBarInactiveBackgroundColor: 'white',
            }}
        >
            <Tab.Screen
                name = "Forum Hub"
                component={ForumHubScreen}
                options={{
                    title: "Forums",
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="chat" color={color} size={size} />
                    ),

                }}
            />
            <Tab.Screen 
                name="Activities" 
                component={ActivityScreen}
                // initialParams={{ dummyAccountStore }}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="account-circle" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Location"
                component={LocationScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="compass" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}