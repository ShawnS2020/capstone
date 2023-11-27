import { Button, View } from 'react-native';
import { useGlobal } from '../state/GlobalContext';

export default function ForumHubLoggedIn({ navigation }) {
    const { logout, setSubforumTitle } = useGlobal();

    function handleClickSubforum(subforumTitle) {
        setSubforumTitle(subforumTitle);
        navigation.navigate('Subforum');
    }

    return (
        <View style={{flex:1}}>
            <View style={{flex:1}}>
            <Button
                onPress={() => handleClickSubforum('Sports')}
                title="Sports subforum"
            />
            <Button
                onPress={() => handleClickSubforum('Music')}
                title="Music subforum"
            />
            </View>
            <Button
                onPress={() => logout()}
                title="Logout"
            />
        </View>
    );
}