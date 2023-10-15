import { observer } from 'mobx-react';
import { View, Text, FlatList } from 'react-native';

function AccountScreen({ route }) {
    const { dummyAccountStore } = route.params;
    const keyExtractor = (item, index) => index.toString();
    return(
        <View>
            <Text>Hobbies</Text>
            <FlatList
                data={dummyAccountStore.hobbies}
                renderItem={({ item }) => <Text>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>}
                keyExtractor={keyExtractor}
            />
            <Text>Home Location</Text>
            <Text>{dummyAccountStore.homeLocation.join(", ")}</Text>
        </View>
    );
}

export default observer(AccountScreen);