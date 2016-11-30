/*
import { GET_SEARCH_RESULTS_REQUEST, GET_SEARCH_RESULTS_SUCCESS, GET_SEARCH_RESULTS_ERROR } from '../constants/actionTypes';
import initialState from './initialState';


const searchReducer = (state = initialState.search, action) => {
  switch (action.type) {
    case GET_SEARCH_RESULTS_REQUEST:
      return {
        isFetching: true
      };

    case GET_SEARCH_RESULTS_SUCCESS:
      return {
        isFetching: false,
        count: action.count,
        next: action.next,
        courses: action.payload
      };

    case GET_SEARCH_RESULTS_ERROR:
      throw action.error;

    default:
      return state;
  }
};

export default searchReducer;
*/
