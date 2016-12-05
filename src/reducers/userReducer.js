import { TOGGLE_SAVED_COURSE } from '../constants/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.user, action) {

  const { savedCourses } = state;

  switch (action.type) {
    case TOGGLE_SAVED_COURSE:
      // add new course ID
      if (savedCourses.indexOf(action.hash) === -1) {
        return {
          savedCourses: savedCourses.concat(action.hash)
        };
      // remove existing saved course ID
      } else {
        const idIndex = savedCourses.indexOf(action.hash);
        return {
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
