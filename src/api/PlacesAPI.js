import { API_KEY } from "@env";
import getLocation from "./ExpoLocation";
import dummyAccountStore from "../state/DummyAccountStore";

async function getPlaces(radius) {
    const originLocation = dummyAccountStore.useCurrentLocation ? await getLocation() : dummyAccountStore.homeLocation;

    if (originLocation == null) {
        return null;
    }

    let hobbies = dummyAccountStore.hobbies;
    let maxResultsCount = 20;
    let placesPerHobby = Math.round(maxResultsCount / hobbies.length);
    const places = [];
    // For each hobby, get place objects using getTextSearchOld and add them to places array.
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
    let i = 0;
    while (places.length < maxResultsCount && i < results.length) {
        let destinationLocation = results[i].geometry.location;
        let distance = await getDistance(originLocation, destinationLocation);
        if (distance > radius) {
            i ++;
            continue;
        }
        // Convert distance from meters to miles and round to the nearest 100th.
        let distanceMi = Math.round(distance * 0.000621371192 * 100) / 100;

        // The text search API call only gets a limited set of details so we call Place Details API for a full set.
        const details = await getDetails(results[i].place_id);
        
        // Create an object that is a copy of the result but with the field photUrls added.
        let place = {
            ...results[i],
            hobby: hobby,
            distance: distanceMi,
        };

        // For each field in details, add that field to place.
        for (const [key, value] of Object.entries(details)) {
            place[key] = value;
        }

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

// This function calls the Place Details API to get the fields website, vicinity, and photos.
// The function also calls getPhotoUrl to get the URL for each photo.
async function getDetails(placeId) {
    const URL = 'https://maps.googleapis.com/maps/api/place/details/json' +
        `?place_id=${placeId}` +
        `&fields=photos,website,vicinity` +
        `&key=${API_KEY}`;
    let response = await fetch(URL);
    let json = await response.json();
    // Create an object with website, vicinity, and photoUrls.
    // If any of these fields are missing, omit them from the object.
    let details = {};
    if (json.result.photos) {
        let photoUrls = [];
        for (let i = 0; i < json.result.photos.length; i++) {
            photoUrls.push(await getPhotoUrl(json.result.photos[i].photo_reference));
        }
        details.photoUrls = photoUrls;
    }
    if (json.result.website) {
        details.website = json.result.website;
    }
    if (json.result.vicinity) {
        details.vicinity = json.result.vicinity;
    }
    return details;
}

async function getPhotoUrl(photoRef) {
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