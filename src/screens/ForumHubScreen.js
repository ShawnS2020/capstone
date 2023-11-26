import { StyleSheet, View, Text, TextInput, Button, FlatList } from 'react-native';

export default function ForumHubScreen({ navigation }) {
    return(
        <View>
            <Button
                onPress={() => navigation.navigate('Forum')}
                title="Forum 1"
            />
            <Button
                onPress={() => navigation.navigate('Forum')}
                title="Forum 2"
            />
            <Button
                onPress={() => navigation.navigate('Login')}
                title="Login/Register"
            />
        </View>
    )
}

const styes = StyleSheet.create({

})