import {
  ASYNC_REQUEST_INIT,
  ASYNC_REQUEST_FAIL,
  GET_CATEGORY_LIST_SUCCESS,
  GET_CATEGORY_COURSE_LIST_SUCCESS,
  GET_COURSE_DETAILS_SUCCESS,
  TOGGLE_SUBCATEGORIES
} from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action) {

  switch (action.type) {
    case ASYNC_REQUEST_INIT:
      return objectAssign({}, state, {isFetching: true});

    case ASYNC_REQUEST_FAIL:
      throw(action.error);

    case GET_CATEGORY_LIST_SUCCESS:
      /* Store each category as a field on 'categories' (i.e. state.courses.categories[id])
        with an additional isOpen field, then store subcategories */
      return objectAssign({}, state, {
        isFetching: false,
        categories: action.payload
          .reduce((cache, category) => {
              cache[category.category_id] = {
                ...category,
                isOpen: false
              };
              return cache;
          }, {}),
        subcategories: action.payload
          .filter(subcategory => (subcategory.count !== 0))
          .reduce((cache, subcategory) => {
            cache[subcategory.category_id] = subcategory;
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
          name: state.categories[action.id].name,
          next: action.next,
          prev: action.prev,
          courses: action.payload
        }

        /*,
        displayedCourseCache: action.payload
          .filter(course => !state.displayedCourseCache.hasOwnProperty(course.id))
          .reduce((cache, course) => {
              cache[course.id] = course;
              return cache;
          }, {...state.displayedCourseCache}) */
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

    case TOGGLE_SUBCATEGORIES:
      return objectAssign({}, state, {
        categories: {
          ...state.categories,
          [action.id]: {
            ...state.categories[action.id],
            isOpen: !state.categories[action.id].isOpen
          }
        }
      });

    default:
      return state;
  }
}
