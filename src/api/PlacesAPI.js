import { IOS_KEY } from "@env";
import getLocation from "./ExpoLocation";
import guestAccountStore from "../state/GuestAccountStore";

async function getPlaces() {
    const originLocation = guestAccountStore.useCurrentLocation ? await getLocation() : guestAccountStore.homeLocation.coordinates;

    if (originLocation == null) {
        return null;
    }

    let hobbies = guestAccountStore.hobbies;
    console.log(guestAccountStore.hobbies);
    const places = [];
    // For each hobby, get place objects using getTextSearch and add them to places array.
    /*** Handle these asynchronously ***/
    const promises = Array.from({ length: hobbies.length }, async (_, i) => {
        let thisHobbyPlaces = await getTextSearch(originLocation, /*radius,*/ hobbies[i]/*, placesPerHobby*/);
        places.push(...thisHobbyPlaces);
    });
    await Promise.all(promises);

    return places;
}

// This function gets places using the Google Places TextSearch API.
// The API takes a query and location and returns a list of places.
// We use a hobby as the query and the user's current or home location as the location.
async function getTextSearch(originLocation, hobby) {
    console.log(`Getting places for hobby: ${hobby}`)
    const URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json' +
        `?query=${hobby}` +
        `&location=${originLocation[0]},${originLocation[1]}` +
        `&key=${IOS_KEY}`;
    let response = await fetch(URL);
    let json = await response.json();
    if (json.status != "OK") {
        console.log("Error in getTextSearch")
        console.log(json);
        return;
    }
    let results = json.results;
    let places = [];
    for (let i = 0; i < results.length; i++) {
        let place = {
            ...results[i],
            hobby: hobby,
            distance: null,
            website: null,
        };
        places.push(place);
    }
    console.log(`${hobby}: Got ${places.length} places for hobby: ${hobby}`)
    return places;
}

// This function modifies a place object that has already been displayed in the user's feed.
// It adds distance in miles, photo urls, and the website link to the place object.
async function getDistanceAndDetails(place) {
    const originLocation = guestAccountStore.useCurrentLocation ? await getLocation() : guestAccountStore.homeLocation.coordinates;
    const destinationLocation = place.geometry.location;
    const placeId = place.place_id;
    // The text search API call only gets a limited set of details so we call Place Details API for a full set.
    // We also get the distance from the user's location to the place.
    // Run getDistance and getDetails in parallel.
    const [distance, details] = await Promise.all([
        getDistance(originLocation, destinationLocation),
        getDetails(placeId)
    ]);
    // Convert distance from meters to miles and round to the nearest 100th.
    let distanceMi = Math.round(distance * 0.000621371192 * 100) / 100;
    // Return a new object that includes the original place data, the distance, and the details.
    return {
        ...place,
        distance: distanceMi,
        ...details
    };
}

async function getDistance(origin, destination) {
    const URL = 'https://routes.googleapis.com/directions/v2:computeRoutes'
    let response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-FieldMask': 'routes.distanceMeters',
            'X-Goog-Api-Key': IOS_KEY
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

// This function calls the Place Details API to get the website and photo_reference for each place.
// The function also calls getPhotoUrl to get the URL for each photo.
async function getDetails(placeId) {
    const URL = 'https://maps.googleapis.com/maps/api/place/details/json' +
        `?place_id=${placeId}` +
        `&fields=photos,website` +
        `&key=${IOS_KEY}`;
    let response = await fetch(URL);
    let json = await response.json();
    // Create an object with website and photoUrls, checking if each field exists first.
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
    return details;
}

// This function gets a url for a photo using the photo_reference passed to it.
async function getPhotoUrl(photoRef) {
    const URL = "https://maps.googleapis.com/maps/api/place/photo" +
        `?photo_reference=${photoRef}` +
        "&maxwidth=1600" +
        `&key=${IOS_KEY}`;
    let response = await fetch(URL);
    return response.url;
}

// *** TODO: try FieldMask: '*' ***
// // This feature is in preview and may have limited support. Backup is getTextSearch.
// // For some reason this is not returning photos so we will use the old version for now.
// async function getTextSearchNew() { 
//     let location = await getLocation();
//     let url = 'https://places.googleapis.com/v1/places:searchText'
//     let response = await fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'X-Goog-FieldMask': 'places.displayName,places.photos,places.id',
//             'X-Goog-Api-Key': IOS_KEY
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

export { getPlaces, getDistanceAndDetails }