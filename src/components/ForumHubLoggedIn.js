import { Button, View } from 'react-native';
import { useAuth } from '../state/AuthContext';

export default function ForumHubLoggedIn({ navigation }) {
    const { logout } = useAuth();

    return (
        <View style={{flex:1}}>
            <View style={{flex:1}}>
            <Button
                onPress={() => navigation.navigate('Subforum', { passedVar : 'Sports' })}
                title="Sports subforum"
            />
            <Button
                onPress={() => navigation.navigate('Subforum', { passedVar : 'Music' })}
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