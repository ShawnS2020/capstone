import * as Location from 'expo-location';

export default async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        return null;
    }

    let location = await Location.getCurrentPositionAsync({});
    let coords = [location.coords.latitude, location.coords.longitude];
    return coords;
}