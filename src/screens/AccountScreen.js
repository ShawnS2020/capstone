import { observer, inject } from 'mobx-react';
import { View, Text, FlatList, Image, StyleSheet, Switch } from 'react-native';

export default inject('dummyAccountStore')(observer(({ dummyAccountStore }) => {
    const keyExtractor = (item, index) => index.toString();

    function toggleUseCurrentLocation() {
        dummyAccountStore.toggleUseCurrentLocation();
    }

    return(
        <View style={styles.container}>
            <Image 
                source={{uri: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSOUNJZAWeC9NIB0R7h22mZwfRMTEHr7PBDNihFBmmR4U8fklya'}}
                style={{width: 100, height: 100, alignSelf: 'center' }}
            />
            <Text style={styles.usernameText}>{dummyAccountStore.username}</Text>
            <Text style={[styles.text, styles.header]}>Hobbies</Text>
            <FlatList
                data={dummyAccountStore.hobbies}
                renderItem={({ item }) => <Text>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>}
                keyExtractor={keyExtractor}
                contentContainerStyle={{ alignItems: 'center' }}
                style={styles.hobbyList}
            />
            <Text style={styles.header}>Home Location</Text>
            <Text>{dummyAccountStore.homeLocation.join(", ")}</Text>
            <View style={styles.useCurrentLocationSwitch}>
              <Text>Use current Location</Text>
              <Switch
                value={dummyAccountStore.useCurrentLocation}
                onValueChange={toggleUseCurrentLocation}
              />
            </View>
        </View>
    );
}));

const styles = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    usernameText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    header: {
        fontWeight: 'bold',
        marginVertical: 8,
    },
    hobbyList: {
        flexGrow: 0,
    },
    text: {
        fontSize: 16,
    },
    useCurrentLocationSwitch: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-around',
    },
});