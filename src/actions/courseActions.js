import * as types from '../constants/actionTypes';
import fetchAPI from '../api/fetchAPI';

/*
  Each asynchronous call involves the creation of 3 actions which affect state:
   - Initiate async call
   - Action for successfully retrieving data
   - Action for error
*/

/* Fetch list of course categories/subjects */

function getCategoryList() {
  return { type: types.GET_CATEGORY_LIST };
}

function getCategoryListSuccess(categories) {
  return {
    type: types.GET_CATEGORY_LIST_SUCCESS,
    payload: categories
  };
}

function getCategoryListFailure() {
  return {
    type: types.GET_CATEGORY_LIST_FAILURE,
    error: "Could not retrieve category data from the OpenCourseWare API."
  };
}

export function fetchCategoryList() {
  return function (dispatch) {

    dispatch(getCategoryList());

    return fetchAPI('categories')
      .then(response => response.json())
      .then(json => dispatch(getCategoryListSuccess(json)))
      .catch(() => dispatch(getCategoryListFailure()));
  };
}

/* Fetch paginated list of courses for a particular category/subject */

function getCategoryCourseList() {
  return {
    type: types.GET_CATEGORY_COURSE_LIST,
  };
}

function getCategoryCourseListSuccess(category, name) {
  return {
    type: types.GET_CATEGORY_COURSE_LIST_SUCCESS,
    name,
    next: category.next,
    prev: category.previous,
    payload: category.results,
  };
}

function getCategoryCourseListFailure() {
  return {
    type: types.GET_CATEGORY_COURSE_LIST_FAILURE,
    error: "Could not retrieve course data from the OpenCourseWare API."
  };
}

export function fetchCategoryCourseList(categoryName, categoryId) {
  return function (dispatch) {

    dispatch(getCategoryCourseList());

    return fetchAPI('categories/' + categoryId)
      .then(response => response.json())
      .then(json => dispatch(getCategoryCourseListSuccess(json, categoryName)))
      .catch(() => dispatch(getCategoryCourseListFailure()));
  };
}

/* Fetch list of courses for a particular course */

function getCourseDetails(hash) {
  return {
    type: types.GET_COURSE_DETAILS,
    hash
  };
}

function getCourseDetailsSuccess(course) {
  return {
    type: types.GET_COURSE_DETAILS_SUCCESS,
    payload: course,
  };
}

function getCourseDetailsFailure() {
  return {
    type: types.GET_COURSE_DETAILS_FAILURE,
    error: "Could not retrieve course data from the OpenCourseWare API."
  };
}

export function fetchCourseDetails(hash) {
  return function (dispatch) {
    // Signal start of async call
    dispatch(getCourseDetails(hash));

    return fetchAPI('courses/view/'+hash)
      .then(response => response.json())
      .then(json => dispatch(getCourseDetailsSuccess(json)))
      .catch(() => dispatch(getCourseDetailsFailure()));
  };
}

// If we are passing a prev/next key for paginated course results

export function fetchCategoryCourseListFromLink(url, categoryName) {
  return function (dispatch) {

    dispatch(getCategoryCourseList());

    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(getCategoryCourseListSuccess(json, categoryName)))
      .catch(() => dispatch(getCategoryCourseListFailure()));
  };
}


/* Store hash ID of course on click */

export function saveCourseSlug(hash) {
  return {
    type: types.SAVE_COURSE_SLUG,
    hash
  };
}
