import { API_KEY } from "@env";

async function getPredictions(text) {
  const URL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json' +
    `?input=${text}` +
    `&key=${API_KEY}`;
  let response = await fetch(URL);
  let json = await response.json();
  return json.predictions;
}

async function getCoordinates(placeId) {
  const URL = 'https://maps.googleapis.com/maps/api/place/details/json' +
    `?place_id=${placeId}` +
    `&fields=geometry` +
    `&key=${API_KEY}`;
  let response = await fetch(URL);
  let json = await response.json();
  return json.result.geometry.location;
}

export { getPredictions, getCoordinates }