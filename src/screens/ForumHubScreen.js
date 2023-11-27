import { View } from 'react-native';
import { useAuth } from '../state/AuthContext';
import ForumHubLoggedIn from '../components/ForumHubLoggedIn';
import LoginScreen from './LoginScreen';

export default function ForumHubScreen({ navigation }) {
    const { isLoggedIn } = useAuth();

    return (
        <View style={{flex:1}}>
            {/* { isLoggedIn ? <ForumHubLoggedIn navigation={navigation} /> : <ForumHubLoggedOut navigation={navigation} /> } */}
            { isLoggedIn ? <ForumHubLoggedIn navigation={navigation} /> : <LoginScreen navigation={navigation} /> }
            {/* <LoginScreen navigation={navigation}/> */}
        </View>
    );
}