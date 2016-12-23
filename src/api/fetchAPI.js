import fetch from 'isomorphic-fetch';

export const checkStatus = response => {
  return (
    response.status === 200
    ? Promise.resolve(response)
    : Promise.reject(new Error(response.statusText))
  );
};

export const getJSON = response => response.json();

// Takes a relative API endpoint and returns a Promise
const fetchAPI = (endpoint, params) => {
  // Request config
  const options = { mode: "cors" },
    BASE_URL = 'http://data.oeconsortium.org/api/v1/',
    PARAMS = params
      ? '/?' + params + '&format=json'
      : '/?format=json';

  return fetch(BASE_URL + endpoint + PARAMS, options);
};

export const fetchCategoryListFromAPI = () => {
  return fetchAPI('categories');
};

export const fetchCategoryCourseListFromAPI = (id, pageNumber) => {
  const PAGE_PARAM = pageNumber ? `page=${pageNumber}` : null;
  return fetchAPI(`categories/${id}`, PAGE_PARAM);
};

export const fetchCourseDetailsFromAPI = (hash) => {
  return fetchAPI(`courses/view/${hash}`);
};

export const fetchSearchResultsFromAPI = (query, pageNumber) => {
  const QUERY_PARAM = `q=${query}`;
  const PAGE_PARAM = pageNumber ? `&page=${pageNumber}` : '';
  const FULL_PARAMS = QUERY_PARAM + PAGE_PARAM;
  return fetchAPI('courses/search', FULL_PARAMS);
};
