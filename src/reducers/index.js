// Set up your root reducer here...
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import courses from './courseReducer';
import user from './userReducer';

const rootReducer =  combineReducers({
  courses,
  user,
  routing: routerReducer
});

export default rootReducer;
