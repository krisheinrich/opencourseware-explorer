import { TOGGLE_SAVED_COURSE, CHANGE_SAVED_COURSES_PAGE } from '../constants/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.user, action) {

  const { savedCourses } = state;

  switch (action.type) {
    case TOGGLE_SAVED_COURSE:
      if (savedCourses.indexOf(action.hash) === -1) {
        // add new course ID
        const newList = savedCourses.concat(action.hash);
        return {
          ...state,
          savedCourses: newList,
          totalPages: Math.ceil(newList.length / 10)
        };
      } else {
        // remove existing saved course ID
        const ind = savedCourses.indexOf(action.hash);
        const newList = [
          ...savedCourses.slice(0, ind),
          ...savedCourses.slice(ind + 1)
        ];
        return {
          ...state,
          savedCourses: newList,
          totalPages: Math.ceil(newList.length / 10)
        };
      }

    case CHANGE_SAVED_COURSES_PAGE:
      return {
        ...state,
        currentPage: action.page
      };

    default:
      return state;
  }
}
