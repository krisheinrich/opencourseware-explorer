import {
  GET_CATEGORY_COURSE_LIST_REQUEST, GET_CATEGORY_COURSE_LIST_SUCCESS, GET_CATEGORY_COURSE_LIST_ERROR,
  GET_COURSE_DETAILS_REQUEST, GET_COURSE_DETAILS_SUCCESS, GET_COURSE_DETAILS_ERROR,
  GET_SEARCH_RESULTS_REQUEST, GET_SEARCH_RESULTS_SUCCESS, GET_SEARCH_RESULTS_ERROR
} from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action) {

  switch (action.type) {
    case GET_CATEGORY_COURSE_LIST_REQUEST:
    case GET_COURSE_DETAILS_REQUEST:
    case GET_SEARCH_RESULTS_REQUEST:
      return objectAssign({}, state, {isFetching: true});

    case GET_CATEGORY_COURSE_LIST_SUCCESS:
    case GET_SEARCH_RESULTS_SUCCESS:
      // store details for all courses in the current page of results
      return objectAssign({}, state, {
        isFetching: false,
        byHash: {
          ...state.byHash,
          ...action.byHash
        }
      });

    case GET_COURSE_DETAILS_SUCCESS:
      // store additional details about the current displayed course
      return objectAssign({}, state, {
        isFetching: false,
        byHash: {
          ...state.byHash,
          [action.payload.hash]: action.payload
        }
      });

    case GET_CATEGORY_COURSE_LIST_ERROR:
    case GET_COURSE_DETAILS_ERROR:
    case GET_SEARCH_RESULTS_ERROR:
      throw(action.error);

    default:
      return state;
  }
}
