import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { inject } from 'mobx-react';
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
import NavTabsHeader from '../components/NavTabsHeader.js';
import ForumHubScreen from './ForumHubScreen.js';
import PlacesScreen from './PlacesScreen.js';
import AccountScreen from './AccountScreen.js';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default inject('dummyAccountStore')(NavTabs = ({ route }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    let routeTitle = getFocusedRouteNameFromRoute(route) ?? 'Places';
    if (routeTitle === 'Forum Hub') {
        routeTitle = 'Forums';
    }

    function handleClickMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    return(
        <Tab.Navigator
            initialRouteName="Places"
            screenOptions={{
                header:() => <NavTabsHeader routeTitle={routeTitle} handleClickMenu={handleClickMenu} />,
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
                name="Places"
                children={() => <PlacesScreen isMenuOpen={isMenuOpen} />}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="compass" color={color} size={size} />
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
        </Tab.Navigator>
    );
});