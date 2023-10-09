import { API_KEY } from "@env";
import getLocation from "./location";

async function getNearbyPlaces() {
    let location = await getLocation();
    let URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json' +
        `?location=${location[0]}, ${location[1]}` +
        '&radius=15000' +
        '&keyword=skate%20park' +
        `&key=${API_KEY}`;
    let response = await fetch(URL);
    return await response.json();
}

// Backup for getTextSearchNew.
async function getTextSearchOld() {
    let location = await getLocation();
    let url = 'https://maps.googleapis.com/maps/api/place/textsearch/json' +
        `?query=troy%20skate%20park` +
        `&location=${location[0]},${location[1]}` +
        `&radius=0` +
        `&key=${API_KEY}`;
    let response = await fetch(url);
    let json = await response.json();
    let results = json.results;
    let places = [];
    for (let i = 0; i < results.length; i++) {
        let photoRef = results[i].photos[0].photo_reference;
        let photoURL = await getPhoto(photoRef);
        let place = {
            name: results[i].name,
            photoURL: photoURL
        }
        places.push(place);
    }
    return places;
}

// This feature is in preview and may have limited support. Backup is getTextSearchOld.
async function getTextSearchNew() { 
    let location = await getLocation();
    let url = 'https://places.googleapis.com/v1/places:searchText'
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-FieldMask': 'places.displayName,places.photos,places.id',
            'X-Goog-Api-Key': API_KEY
        },
        body: JSON.stringify({
            textQuery: 'skate park',
            locationBias: {
                circle: {
                    center: { latitude: location[0], longitude: location[1] },
                    radius: 15000
                }
            }
        })
    });
    let json = await response.json();
    console.log(json);
    let places = json.places;
    for (let i = 0; i < places.length; i++) {
        console.log(places[i]);
    }
}

async function getPhoto(photoRef) {
    let URL = "https://maps.googleapis.com/maps/api/place/photo" +
        `?photo_reference=${photoRef}` +
        "&maxwidth=1600" +
        `&key=${API_KEY}`;
    let response = await fetch(URL);
    return response.url;
}

export { getTextSearchOld, getTextSearchNew, getNearbyPlaces }