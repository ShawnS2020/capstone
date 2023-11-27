import { View } from 'react-native';
import { useGlobal } from '../state/GlobalContext';
import ForumHubLoggedIn from '../components/ForumHubLoggedIn';
import LoginScreen from './LoginScreen';

export default function ForumHubScreen({ navigation }) {
    const { isLoggedIn } = useGlobal();

    return (
        <View style={{flex:1}}>
            {/* { isLoggedIn ? <ForumHubLoggedIn navigation={navigation} /> : <ForumHubLoggedOut navigation={navigation} /> } */}
            { isLoggedIn ? <ForumHubLoggedIn navigation={navigation} /> : <LoginScreen navigation={navigation} /> }
            {/* <LoginScreen navigation={navigation}/> */}
        </View>
    );
}