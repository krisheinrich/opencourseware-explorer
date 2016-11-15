import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
import fetchAPI from '../api/fetchAPI';
import * as types from '../constants/actionTypes';

/*
  Each asynchronous call involves the creation of 3 actions which affect state:
   - Initiate async call
   - Action for successfully retrieving data
   - Action for error
*/

// Shared by all async calls

function asyncRequestInit() {
  return { type: types.ASYNC_REQUEST_INIT };
}

function asyncRequestFail(error) {
  return { type: types.ASYNC_REQUEST_FAIL, error };
}

// Fetch list of course categories/subjects

function getCategoryListSuccess(categories) {
  return {
    type: types.GET_CATEGORY_LIST_SUCCESS,
    payload: categories
  };
}

export function loadCategories() {
  return function (dispatch) {

    dispatch(asyncRequestInit());
    return fetchAPI('categories')
      .then(response => response.json())
      .then(json => dispatch(getCategoryListSuccess(json)))
      .catch(error => dispatch(asyncRequestFail(error)));
  };
}

// Fetch paginated list of courses for a particular category/subject

function getCategoryCourseListSuccess(page, categoryId) {
  return {
    type: types.GET_CATEGORY_COURSE_LIST_SUCCESS,
    id: categoryId,
    next: page.next,
    prev: page.previous,
    payload: page.results,
  };
}

export function fetchCategoryCourseListFromId(categoryId) {
  return function (dispatch) {

    dispatch(asyncRequestInit());
    return fetchAPI('categories/' + categoryId)
      .then(response => response.json())
      .then(json => {
        dispatch(getCategoryCourseListSuccess(json, categoryId));
      })
      .then(() => browserHistory.push('/category/'+categoryId))
      .catch(error => dispatch(asyncRequestFail(error)));
  };
}

// If we are passing a prev/next key for paginated course results
export function fetchCategoryCourseListFromURL(url, categoryId) {
  return function (dispatch) {

    dispatch(asyncRequestInit());
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(getCategoryCourseListSuccess(json, categoryId)))
      .catch(error => dispatch(asyncRequestFail(error)));
  };
}

// Fetch list of courses for a particular course

function getCourseDetailsSuccess(course) {
  return {
    type: types.GET_COURSE_DETAILS_SUCCESS,
    payload: course,
  };
}

export function fetchCourseDetails(hash) {
  return function (dispatch) {

    dispatch(asyncRequestInit());
    return fetchAPI('courses/view/'+hash)
      .then(response => response.json())
      .then(json => dispatch(getCourseDetailsSuccess(json)))
      .catch(error => dispatch(asyncRequestFail(error)));
  };
}

// Toggle sub-category visibility
export function toggleSubcategories(id) {
  return {
    type: types.TOGGLE_SUBCATEGORIES,
    id
  };
}
