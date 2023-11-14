import { observer, inject } from 'mobx-react';
import { View, Text, FlatList, Image, StyleSheet, Switch } from 'react-native';


export default inject('dummyAccountStore')(observer(({ dummyAccountStore }) => {
    const keyExtractor = (item, index) => index.toString();

    return(
        <View style={styles.container}>
            <Image 
                source={{uri: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSOUNJZAWeC9NIB0R7h22mZwfRMTEHr7PBDNihFBmmR4U8fklya'}}
                style={{width: 100, height: 100, alignSelf: 'center' }}
            />
            <View style={{paddingHorizontal:30,marginBottom: 25}}>
                <Text style={{textAlign: 'center',fontSize: 24,fontWeight: 'bold', marginTop:15, marginBottom:5}}> John Smith </Text>
            </View>
            <View style={{paddingHorizontal:30,marginBottom: 25}}>
                <Text style={{textAlign: 'center',fontSize:15,fontWeight: 'bold', marginTop:15, marginBottom:5}}>Hobbies</Text>
                <FlatList style={{textAlign: 'center',fontSize:15,fontWeight: 'bold', marginTop:15, marginBottom:5}}
                    data={dummyAccountStore.hobbies}
                    renderItem={({ item }) => <Text style={{textAlign: 'center'}}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>}
                    keyExtractor={keyExtractor}
                />
            </View>
            <View style={{paddingHorizontal:30,marginBottom: 25}}>
                <Text style={{textAlign: 'center',fontSize:15,fontWeight: 'bold', marginTop:15, marginBottom:5}}>Home Location</Text>
                <Text style={{textAlign: 'center'}}>{dummyAccountStore.homeLocation.join(", ")}</Text>
            </View>
            <View style={styles.useCurrentLocationSwitch}>
              <Text>Use current Location</Text>
              <Switch
                value={dummyAccountStore.useCurrentLocation}
                onValueChange={dummyAccountStore.toggleUseCurrentLocation}
              />
              <Text>{dummyAccountStore.useCurrentLocation.toString()}</Text>
            </View>
        </View>
    );
}));

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#FFF',
    },
    useCurrentLocationSwitch: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-around',
    },
});