import { API_KEY } from "@env";
import getLocation from "./location";
import dummyAccountStore from "../state/DummyAccountStore";

async function getPlaces(isOriginCurrent, radius) {
    const originLocation = isOriginCurrent ? await getLocation() : dummyAccountStore.homeLocation;
    console.log(`Getting places with location: ${originLocation}`)
    let hobbies = dummyAccountStore.hobbies;
    let maxResultsCount = 10;
    let placesPerHobby = Math.round(maxResultsCount / hobbies.length);
    const places = [];
    for (let i = 0; i < hobbies.length; i++) {
        let thisHobbyPlaces = await getTextSearchOld(originLocation, radius, hobbies[i], placesPerHobby);
        places.push(...thisHobbyPlaces);
    }
    return places;
}

// Backup for getTextSearchNew.
// This function gets places using the Google Places TextSearch API.
// The API takes a query, location, and radius and returns a list of places.
// We use a hobby as the query, the user's current or home location as the location, and a radius given by the developer.
// *** TODO: radius control is only accessible now for testing purposes ***
async function getTextSearchOld(originLocation, radius, hobby, maxResultsCount) {
    console.log(`Getting places for hobby: ${hobby}`)
    const URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json' +
        `?query=${hobby}` +
        `&location=${originLocation[0]},${originLocation[1]}` +
        `&radius=${radius}` +
        `&key=${API_KEY}`;
    let response = await fetch(URL);
    let json = await response.json();
    if (json.status != "OK") {
        console.log("Error in getTextSearchOld")
        console.log(json);
        return;
    }
    let results = json.results;
    let places = [];
    console.log(`Found ${results.length} places for hobby: ${hobby}`)
    let i = 0;
    while (places.length < maxResultsCount && i < results.length) {
        console.log(`Getting place ${i} for hobby: ${hobby}`)
        let destinationLocation = results[i].geometry.location;
        let distance = await getDistance(originLocation, destinationLocation);
        if (distance > radius) {
            console.log(`Place ${i} for hobby: ${hobby} is too far away`)
            i ++;
            continue;
        }

        // Create an object that is a copy of the result but with the field photUrl added.
        let place = {
            ...results[i],
            ...(results[i].photos && { photoURL: await getPhoto(results[i].photos[0].photo_reference) })
        };
        places.push(place);
        i ++;
    }
    console.log(`Got ${places.length} places for hobby: ${hobby}`)
    return places;
}

async function getDistance(origin, destination) {
    const URL = 'https://routes.googleapis.com/directions/v2:computeRoutes'
    let response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-FieldMask': 'routes.distanceMeters',
            'X-Goog-Api-Key': API_KEY
        },
        body: JSON.stringify({
            origin: { location: { latLng: { latitude: origin[0], longitude: origin[1] }}},
            destination: { location: { latLng: { latitude: destination.lat, longitude: destination.lng }}},
            travelMode: 'DRIVE'
        })
    });
    let json = await response.json();
    let distance = json.routes[0].distanceMeters;
    return distance;
}

async function getPhoto(photoRef) {
    const URL = "https://maps.googleapis.com/maps/api/place/photo" +
        `?photo_reference=${photoRef}` +
        "&maxwidth=1600" +
        `&key=${API_KEY}`;
    let response = await fetch(URL);
    return response.url;
}

// *** TODO: try FieldMask: '*' ***
// // This feature is in preview and may have limited support. Backup is getTextSearchOld.
// // For some reason this is not returning photos so we will use the old version for now.
// async function getTextSearchNew() { 
//     let location = await getLocation();
//     let url = 'https://places.googleapis.com/v1/places:searchText'
//     let response = await fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'X-Goog-FieldMask': 'places.displayName,places.photos,places.id',
//             'X-Goog-Api-Key': API_KEY
//         },
//         body: JSON.stringify({
//             textQuery: 'skate park',
//             locationBias: {
//                 circle: {
//                     center: { latitude: location[0], longitude: location[1] },
//                     radius: 15000
//                 }
//             }
//         })
//     });
//     let json = await response.json();
//     console.log(json);
//     let places = json.places;
//     for (let i = 0; i < places.length; i++) {
//         console.log(places[i]);
//     }
// }

export { getPlaces }