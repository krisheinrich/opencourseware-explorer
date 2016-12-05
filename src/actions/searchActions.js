import { fetchSearchResultsFromAPI, checkStatus, getJSON } from '../api/fetchAPI';
import * as types from '../constants/actionTypes';

// Helpers

function getTotalPageCount(courseCount) {
  return Math.ceil(courseCount/10);
}

function getSearchResultsByHash(courses) {
  let resultsByHash = {};
  courses.forEach(({id, title, author, description, link, categories}) => {
    resultsByHash[id] = {
      hash: id,
      name: title,
      author,
      description,
      url: link,
      categories: categories[0].split("/").slice(1)
    };
  });
  return resultsByHash;
}

// Action creators

export const requestSearchResults = () => ({
  type: types.GET_SEARCH_RESULTS_REQUEST
});

export const getSearchResultsSuccess = (query, results) => ({
  type: types.GET_SEARCH_RESULTS_SUCCESS,
  query,
  count: results.count,
  currentPage: results.page,
  totalPages: getTotalPageCount(results.count),
  byHash: getSearchResultsByHash(results.documents)
});

export const getSearchResultsError = error => ({
  type: types.GET_SEARCH_RESULTS_ERROR,
  error
});

export const fetchSearchResults = (query, page) => dispatch => {
  dispatch(requestSearchResults());
  return fetchSearchResultsFromAPI(query, page)
    .then(checkStatus)
    .then(getJSON)
    .then(json => dispatch(getSearchResultsSuccess(query, json)))
    .catch(error => dispatch(getSearchResultsError(error)));
};
