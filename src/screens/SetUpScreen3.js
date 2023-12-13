import { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { ImageBackground, StyleSheet, Text, View, Switch, ScrollView } from 'react-native';
import { useGlobal } from '../state/GlobalContext';
import { getCoordinates } from '../api/PlaceAutocomplete';
import HomeLocation from '../components/HomeLocation';
import RoundButton from '../components/RoundButton';

const image = {uri: 'https://img.freepik.com/premium-vector/various-hobbies-icons-selection-white-background-vector_532963-598.jpg?w=1380'};

export default inject("guestAccountStore")(observer(({ guestAccountStore, navigation }) => {
    const { loadFeed } = useGlobal();
    const [homeLocation, setHomeLocation] = useState(guestAccountStore.homeLocation);

    function toggleUseCurrentLocation() {
        guestAccountStore.toggleUseCurrentLocation();
    }

    async function handleNextButtonClick() {
        if (homeLocation.description != guestAccountStore.homeLocation.description) {
            const coordinates = await getCoordinates(homeLocation.place_id);
            guestAccountStore.changeHomeLocation({ description: homeLocation.description, coordinates: [coordinates.lat, coordinates.lng] });
        }
        loadFeed();
        navigation.navigate("Setup 4");
    }

    function handleSkipButtonClick() {
        navigation.navigate("Nav Tabs");
    }

    return (
        <ImageBackground source={image}>
            <ScrollView style={styles.container} contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-end'}}>
                <View style={styles.upper}>
                    <View style={styles.homeLocationSection}>
                        <Text style={{fontSize: 20}}>Enter a location to use when device location is off.</Text>
                        <HomeLocation setHomeLocation={setHomeLocation} />
                    </View>
                    <View style={styles.useCurrentLocationSwitch}>
                      <Text style={{fontSize: 20}}>Use current location</Text>
                      <Switch
                        value={guestAccountStore.useCurrentLocation}
                        onValueChange={toggleUseCurrentLocation}
                      />
                    </View>
                </View>
                    <View style={styles.lower}>
                        <RoundButton
                            onPress={handleNextButtonClick}
                            title="Next"
                        />
                        <RoundButton
                            onPress={handleSkipButtonClick}
                            title="Skip"
                        />
                  </View> 
            </ScrollView>
        </ImageBackground>
    );
}));

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        height: '100%',
    },
    upper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    lower: {
        rowGap: 10,
        alignSelf: 'flex-end',
        paddingRight: 20,
        marginBottom: 20
    },
    homeLocationSection: {
        rowGap: 8,
    },
    useCurrentLocationSwitch: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-around',
    },
});