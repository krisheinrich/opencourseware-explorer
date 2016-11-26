import {
  GET_CATEGORY_LIST_REQUEST, GET_CATEGORY_LIST_SUCCESS, GET_CATEGORY_LIST_ERROR,
  GET_CATEGORY_COURSE_LIST_REQUEST, GET_CATEGORY_COURSE_LIST_SUCCESS, GET_CATEGORY_COURSE_LIST_ERROR,
  GET_COURSE_DETAILS_REQUEST, GET_COURSE_DETAILS_SUCCESS, GET_COURSE_DETAILS_ERROR
} from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

/*
const getAllCategories = categoriesArray => {
  // Build Categories slice of Store
  //
  // for each cat:
  //   store its data to state.categories with { isOpen: false, isSubcategory: false } on [cat.id]
  //   if children.length > 0:
  //     for each child:
  //       store data to state.categories with { isSubcategory: true, parent: parentId }
  //
  // NOTE: Some subcategories in the API incorrectly record the count of available courses.
  // I have created the following filter to prevent storing subcategories that will not
  // generate course lists when clicked.

  const subcategoryFilter = (subcat) => {
    // Only includes these subcategories:
    // Business > Professional Coaching
    // Education > Educational Leadership
    // Sci & Tech > Kinesiology
    // Workforce > Fire safety
    const allowedSubcategoryIds = [
      '2671',
      '250424',
      '250447',
      '914017'
    ];
    return allowedSubcategoryIds.indexOf(subcat.category_id) > -1;
  };

  const categoryCache = categoriesArray

  return {
    ...categoryCache,
    ...subcategoryCache
  };
};
*/

export default function courseReducer(state = initialState.courses, action) {

  // For storing categories and their subcategories (GET_CATEGORY_LIST_SUCCES)

  switch (action.type) {
    case GET_CATEGORY_LIST_REQUEST:
    case GET_CATEGORY_COURSE_LIST_REQUEST:
    case GET_COURSE_DETAILS_REQUEST:
      return objectAssign({}, state, {isFetching: true});

    case GET_CATEGORY_LIST_SUCCESS:
      /* Store each category and child subcategories as a field on 'categories'
         (i.e. state.courses.categories[id]) */
      return objectAssign({}, state, {
        isFetching: false,
        categories: action.payload.reduce((cache, category) => {
          cache[category.category_id] = {
            name: category.name,
            count: category.course_count,
            children: state.categories[category.category_id].children
            // Keep initial subcategories
          };
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
        },
        displayedCategory: {
          name: state.categories[action.id].name,
          count: action.count,
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
          provider: action.payload.provider_name,
          url: action.payload.linkurl,
          categories: action.payload.categories[0].split("/")
        }
      });

    case GET_CATEGORY_LIST_ERROR:
    case GET_CATEGORY_COURSE_LIST_ERROR:
    case GET_COURSE_DETAILS_ERROR:
      throw(action.error);

    default:
      return state;
  }
}
