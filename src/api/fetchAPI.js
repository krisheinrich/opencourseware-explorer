import fetch from 'isomorphic-fetch';

// Request config
const BASE_URL = 'http://data.oeconsortium.org/api/v1/';
const TO_JSON = '/?format=json';
const options = { mode: "cors" };

export const checkStatus = response => {
  return (
    response.status === 200
    ? Promise.resolve(response)
    : Promise.reject(new Error(response.statusText))
  );
};

export const getJSON = response => response.json();


// Takes a relative API endpoint and returns Promise
const fetchAPI = endpoint => fetch(BASE_URL + endpoint + TO_JSON, options);

export default fetchAPI;
