import { combineReducers } from 'redux';
import {
  GET_CATEGORY_COURSE_LIST_REQUEST, GET_CATEGORY_COURSE_LIST_SUCCESS, GET_CATEGORY_COURSE_LIST_ERROR,
  GET_SEARCH_RESULTS_REQUEST, GET_SEARCH_RESULTS_SUCCESS, GET_SEARCH_RESULTS_ERROR
} from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

function byCategory(state = initialState.pagination.byCategory, action) {
  switch (action.type) {

    case GET_CATEGORY_COURSE_LIST_REQUEST:
      return objectAssign({}, state, {isFetching: true});

    case GET_CATEGORY_COURSE_LIST_SUCCESS:
      return objectAssign({}, state, {
        isFetching: false,
        name: action.name,
        count: action.count,
        currentPage: action.currentPage,
        totalPages: action.totalPages,
        courses: action.payload
      });

    case GET_CATEGORY_COURSE_LIST_ERROR:
      throw(action.error);

    default:
      return state;
  }
}

function bySearch(state = initialState.pagination.bySearch, action) {
  switch (action.type) {

    case GET_SEARCH_RESULTS_REQUEST:
      return objectAssign({}, state, {isFetching: true});

    case GET_SEARCH_RESULTS_SUCCESS:
      return objectAssign({}, state, {
        isFetching: false,
        count: action.count,
        currentPage: action.currentPage,
        totalPages: action.totalPages,
        courses: action.payload
      });

    case GET_SEARCH_RESULTS_ERROR:
      throw(action.error);

    default:
      return state;
  }
}

const paginationReducer = combineReducers({
  byCategory,
  bySearch
});

export default paginationReducer;
