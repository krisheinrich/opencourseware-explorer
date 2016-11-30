import {
  fetchCategoryCourseListFromAPI, fetchCourseDetailsFromAPI, checkStatus, getJSON
} from '../api/fetchAPI';
import * as types from '../constants/actionTypes';

/*
  Each asynchronous call involves the creation of 3 actions which affect state:
   - Initiate async call
   - Action for successfully retrieving data
   - Action for error
*/

// Helpers

function getTotalPageCount(courseCount) {
  return Math.ceil(courseCount/25);
}

function determinePageNumber(page) {
  // First page of results always has 'previous' === null
  if (!page.previous) {
    return 1;
  }
  // Last page of results always has 'next' === null
  if (!page.next) {
    return getTotalPageCount(page.count);
  }
  // Not first or last means that 'next' contains a page number
  const nextPageNumber = parseInt(page.next.match(/\d+$/)[0], 10);
  return (nextPageNumber - 1);
}

// Fetch paginated list of courses for a particular category/subject

function requestCategoryCourseList() {
  return { type: types.GET_CATEGORY_COURSE_LIST_REQUEST };
}

function getCategoryCourseListSuccess(page, categoryId, pageNum) {
  return {
    type: types.GET_CATEGORY_COURSE_LIST_SUCCESS,
    id: categoryId,
    name: page.title,
    count: page.count,
    currentPage: pageNum || determinePageNumber(page),
    totalPages: getTotalPageCount(page.count),
    payload: page.results
  };
}

function getCategoryCourseListError(error) {
  return {
    type: types.GET_CATEGORY_COURSE_LIST_ERROR,
    error
  };
}

export function fetchCategoryCourseList(categoryId, page) {
  return function (dispatch, getState) {
    if (getState().pagination.byCategory.isFetching) {
      return Promise.resolve();
    }

    dispatch(requestCategoryCourseList());

    return fetchCategoryCourseListFromAPI(categoryId, page)
      .then(checkStatus)
      .then(getJSON)
      .then(json => {
        dispatch(getCategoryCourseListSuccess(json, categoryId, page));
      })
      .catch(error => dispatch(getCategoryCourseListError(error)));
  };
}

/*

// If fetching initial page of course results
export function fetchCategoryCourseListFromId(categoryId) {
  return function (dispatch, getState) {
    if (getState().pagination.byCategory.isFetching) {
      return Promise.resolve();
    }

    dispatch(requestCategoryCourseList());

    return fetchAPI('categories/' + categoryId)
      .then(checkStatus)
      .then(getJSON)
      .then(json => {
        dispatch(getCategoryCourseListSuccess(json, categoryId));
      })
      .catch(error => dispatch(getCategoryCourseListError(error)));
  };
}

// If passing a prev/next key for paginated course results
export function fetchCategoryCourseListFromURL(url, categoryId) {
  return function (dispatch) {

    dispatch(requestCategoryCourseList());
    return fetch(url)
      .then(checkStatus)
      .then(getJSON)
      .then(json => dispatch(getCategoryCourseListSuccess(json, categoryId)))
      .catch(error => dispatch(getCategoryCourseListError(error)));
  };
}

*/

// Fetch more detailed data for a particular course

function requestCourseDetails() {
  return { type: types.GET_COURSE_DETAILS_REQUEST };
}

function getCourseDetailsSuccess(course) {
  return {
    type: types.GET_COURSE_DETAILS_SUCCESS,
    payload: course,
  };
}

function getCourseDetailsError(error) {
  return {
    type: types.GET_COURSE_DETAILS_ERROR,
    error
  };
}

export function fetchCourseDetails(hash) {
  return function (dispatch) {

    dispatch(requestCourseDetails());
    return fetchCourseDetailsFromAPI(hash)
      .then(checkStatus)
      .then(getJSON)
      .then(json => dispatch(getCourseDetailsSuccess(json)))
      .catch(error => dispatch(getCourseDetailsError(error)));
  };
}

export function toggleSavedCourse(id) {
  return {
    type: types.TOGGLE_SAVED_COURSE,
    id
  };
}
