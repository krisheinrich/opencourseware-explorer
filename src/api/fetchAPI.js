import fetch from 'isomorphic-fetch';

// takes a relative API endpoint and returns Promise
const BASE_URL = 'http://data.oeconsortium.org/api/v1/';
const TO_JSON = '/?format=json';
const fetchAPI = endpoint => fetch(BASE_URL + endpoint + TO_JSON);

export default fetchAPI;
