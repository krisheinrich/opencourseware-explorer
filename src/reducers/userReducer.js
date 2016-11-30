import { TOGGLE_SAVED_COURSE } from '../constants/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.user, action) {

  const { savedCourses } = state;

  switch (action.type) {
    case TOGGLE_SAVED_COURSE:
      // add new course ID
      if (savedCourses.indexOf(action.id) === -1) {
        return {
          ...state,
          savedCourses: savedCourses.concat(action.id)
        };
      // remove existing saved course ID
      } else {
        const idIndex = savedCourses.indexOf(action.id);
        return {
          ...state,
          savedCourses: [
            ...savedCourses.slice(0, idIndex),
            ...savedCourses.slice(idIndex + 1)
          ]
        };
      }

    default:
      return state;
  }
}
