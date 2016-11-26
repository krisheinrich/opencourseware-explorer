import fetch from 'isomorphic-fetch';
import fetchAPI, { checkStatus, getJSON } from '../api/fetchAPI';
import * as types from '../constants/actionTypes';

/*
  Each asynchronous call involves the creation of 3 actions which affect state:
   - Initiate async call
   - Action for successfully retrieving data
   - Action for error
*/

// Fetch list of course categories/subjects

function requestCategoryList() {
  return { type: types.GET_CATEGORY_LIST_REQUEST };
}

function getCategoryListSuccess(categories) {
  return {
    type: types.GET_CATEGORY_LIST_SUCCESS,
    payload: categories
  };
}

function getCategoryListError(error) {
  return {
    type: types.GET_CATEGORY_LIST_ERROR,
    error
  };
}

export function loadCategories() {
  return function (dispatch) {
    dispatch(requestCategoryList());
    return fetchAPI('categories')
      .then(checkStatus)
      .then(getJSON)
      .then(json => dispatch(getCategoryListSuccess(json)))
      .catch(error => dispatch(getCategoryListError(error)));
  };
}

// Fetch paginated list of courses for a particular category/subject

function requestCategoryCourseList() {
  return { type: types.GET_CATEGORY_COURSE_LIST_REQUEST };
}

function getCategoryCourseListSuccess(page, categoryId) {
  // Filter results by language
  const languageFilter = "English";

  return {
    type: types.GET_CATEGORY_COURSE_LIST_SUCCESS,
    id: categoryId,
    count: page.count,
    next: page.next,
    prev: page.previous,
    // Want to filter in API request (paginated lists in UI will not be same length otherwise)
    payload: page.results.filter(course => course.language.indexOf(languageFilter) > -1)
  };
}

function getCategoryCourseListError(error) {
  return {
    type: types.GET_CATEGORY_COURSE_LIST_ERROR,
    error
  };
}

// If fetching initial page of course results
export function fetchCategoryCourseListFromId(categoryId) {
  return function (dispatch, getState) {
    if (getState().courses.isFetching) {
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
    return fetchAPI('courses/view/'+hash)
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
