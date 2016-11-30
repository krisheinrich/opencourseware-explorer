import { fetchCategoryListFromAPI, checkStatus, getJSON } from '../api/fetchAPI';
import * as types from '../constants/actionTypes';

/*
  Each asynchronous call involves the creation of 3 actions which affect state:
   - Initiate async call
   - Action for successfully retrieving data
   - Action for error
*/

// Helpers

export const storeCategoriesById = (state, categoryList) => {
  let byId = {};
  categoryList.forEach(category => {
    byId[category.category_id] = {
      // Add data to pre-defined subtopic list on 'children' key
      ...state.byId[category.category_id],
      name: category.name,
      count: category.course_count
    };
  });
  return byId;
};

// Fetch list of course categories/subjects

export const requestCategoryList = () => ({
  type: types.GET_CATEGORY_LIST_REQUEST
});

export const getCategoryListSuccess = categories => ({
  type: types.GET_CATEGORY_LIST_SUCCESS,
  payload: categories
});

export const getCategoryListError = error => ({
  type: types.GET_CATEGORY_LIST_ERROR,
  error
});

export const loadCategories = () => dispatch => {
  dispatch(requestCategoryList());
  return fetchCategoryListFromAPI()
    .then(checkStatus)
    .then(getJSON)
    .then(json => dispatch(getCategoryListSuccess(json)))
    .catch(error => dispatch(getCategoryListError(error)));
};
