import { GET_CATEGORY_LIST_REQUEST, GET_CATEGORY_LIST_SUCCESS, GET_CATEGORY_LIST_ERROR } from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';
import { storeCategoriesById } from '../actions/categoryActions';


const categoryReducer = (state = initialState.categories, action) => {
  switch (action.type) {
    case GET_CATEGORY_LIST_REQUEST:
      return objectAssign({}, state, {isFetching: true});

    case GET_CATEGORY_LIST_SUCCESS:
      return objectAssign({}, state, {
        isFetching: false,
        byId: storeCategoriesById(state, action.payload)
      });

    case GET_CATEGORY_LIST_ERROR:
      throw action.error;

    default:
      return state;
  }
};

export default categoryReducer;
