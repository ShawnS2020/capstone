import { API_KEY } from "@env";

export default async function getPlaces() {
    // await new Promise(resolve => setTimeout(resolve, 1000)); // Add a 1 second delay
    const URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' +
        'location=40.7128,-74.0060' +
        '&radius=1500' +
        '&keyword=skate%20park' +
        `&key=${API_KEY}`;
    const response = await fetch(URL);
    return await response.json();
}