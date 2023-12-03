import * as Location from 'expo-location';

export default async function getLocation() {
    try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            throw new Error('Permission to access location was denied');
        }

        let location = await Location.getCurrentPositionAsync({});
        let coords = [location.coords.latitude, location.coords.longitude];
        return coords;
    } 
    catch(error){
        console.log(error);
        return null;
    }
}