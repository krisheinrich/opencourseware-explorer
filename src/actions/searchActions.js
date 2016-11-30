import { fetchSearchResultsFromAPI, checkStatus, getJSON } from '../api/fetchAPI';
import * as types from '../constants/actionTypes';

// Helpers

function getTotalPageCount(courseCount) {
  return Math.ceil(courseCount/10);
}

function extractRevelantCourseDetails(courses) {
  return courses.map(({id, title, author, description, link, categories}) => (
    {
      hash: id,
      name: title,
      author,
      description,
      url: link,
      categories: categories[0].split("/").slice(1)
    }
  ));
}

export const requestSearchResults = () => ({
  type: types.GET_SEARCH_RESULTS_REQUEST
});

export const getSearchResultsSuccess = results => ({
  type: types.GET_SEARCH_RESULTS_SUCCESS,
  count: results.count,
  currentPage: results.page,
  totalPages: getTotalPageCount(results.count),
  payload: extractRevelantCourseDetails(results.documents)
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
    .then(json => dispatch(getSearchResultsSuccess(json)))
    .catch(error => dispatch(getSearchResultsError(error)));
};
