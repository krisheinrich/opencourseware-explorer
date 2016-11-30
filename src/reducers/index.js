import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import categories from './categoryReducer';
import courses from './courseReducer';
import pagination from './paginationReducer';
import user from './userReducer';

const rootReducer =  combineReducers({
  categories,
  courses,
  pagination,
  user,
  routing: routerReducer
});

export default rootReducer;
