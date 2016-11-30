import {
  GET_CATEGORY_COURSE_LIST_REQUEST, GET_CATEGORY_COURSE_LIST_SUCCESS, GET_CATEGORY_COURSE_LIST_ERROR,
  GET_COURSE_DETAILS_REQUEST, GET_COURSE_DETAILS_SUCCESS, GET_COURSE_DETAILS_ERROR,
  GET_SEARCH_RESULTS_REQUEST, //GET_SEARCH_RESULTS_SUCCESS, GET_SEARCH_RESULTS_ERROR
} from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action) {

  // For storing categories and their subcategories (GET_CATEGORY_LIST_SUCCES)

  switch (action.type) {
    case GET_CATEGORY_COURSE_LIST_REQUEST:
    case GET_COURSE_DETAILS_REQUEST:
    case GET_SEARCH_RESULTS_REQUEST:
      return objectAssign({}, state, {isFetching: true});

    case GET_CATEGORY_COURSE_LIST_SUCCESS:
      // store details for all courses in the current page of results
      return objectAssign({}, state, {
        isFetching: false,
        byHash: {
          ...state.byHash,
          ...action.payload.reduce((cache, course) => {
            cache[course.linkhash] = {
              id: course.id,
              name: course.title,
              author: course.author
            };
            return cache;
          }, {})
        }
      });

    case GET_COURSE_DETAILS_SUCCESS:
      // store additional details about the current displayed course
      return objectAssign({}, state, {
        isFetching: false,
        byHash: {
          ...state.byHash,
          [action.payload.linkhash]: {
            ...state.byHash[action.payload.linkhash],
            description: action.payload.description,
            provider: action.payload.provider_name,
            url: action.payload.linkurl,
            categories: action.payload.categories[0].split("/").slice(1)
          }
        }
      });

    case GET_CATEGORY_COURSE_LIST_ERROR:
    case GET_COURSE_DETAILS_ERROR:
      throw(action.error);

    default:
      return state;
  }
}
