import {
  GET_CATEGORY_LIST, GET_CATEGORY_LIST_SUCCESS, GET_CATEGORY_LIST_FAILURE,
  GET_CATEGORY_COURSE_LIST, GET_CATEGORY_COURSE_LIST_SUCCESS, GET_CATEGORY_COURSE_LIST_FAILURE,
  GET_COURSE_DETAILS, GET_COURSE_DETAILS_SUCCESS, GET_COURSE_DETAILS_FAILURE,
  //SAVE_COURSE_SLUG
} from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action) {

  switch (action.type) {
    case GET_CATEGORY_LIST:
    case GET_CATEGORY_COURSE_LIST:
      return objectAssign({}, state, {isFetching: true});

    case GET_COURSE_DETAILS:
      return objectAssign({}, state, {
        isFetching: true,
        displayedCourse: {
          ...state.displayedCourse,
          hash: action.hash
        }
      });

    case GET_CATEGORY_LIST_SUCCESS:
      return objectAssign({}, state, {
        isFetching: false,
        categories: action.payload
          .reduce((cache, category) => {
              cache[category.category_id] = category;
              return cache;
          }, {})
      });

    case GET_CATEGORY_COURSE_LIST_SUCCESS:
      /**
       * Store info for category as well as cache only the new courses from the
       * paginated result list by filtering out previously-cached courses first
       **/
      return objectAssign({}, state, {
        isFetching: false,
        displayedCategory: {
          name: action.name,
          next: action.next,
          prev: action.prev,
          courses: action.payload
        },
        displayedCourseCache: action.payload
          .filter(course => !state.displayedCourseCache.hasOwnProperty(course.id))
          .reduce((cache, course) => {
              cache[course.id] = course;
              return cache;
          }, {...state.displayedCourseCache})
      });

    case GET_COURSE_DETAILS_SUCCESS:
      return objectAssign({}, state, {
        isFetching: false,
        displayedCourse: {
          id: action.payload.id,
          hash: action.payload.linkhash,
          name: action.payload.title,
          author: action.payload.author,
          description: action.payload.description,
          url: action.payload.linkurl,
          categories: action.payload.categories[0].split("/")
        }
      });

    case GET_CATEGORY_LIST_FAILURE:
    case GET_CATEGORY_COURSE_LIST_FAILURE:
    case GET_COURSE_DETAILS_FAILURE:
      return objectAssign({}, state, {isFetching: false, error: action.error});
/*
    case SAVE_COURSE_SLUG:
      return objectAssign({}, state, { displayedCourse: {hash: action.hash} });
*/
    default:
      return state;
  }
}
