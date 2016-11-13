// Set up your root reducer here...
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import courseReducer from './courseReducer';
import userReducer from './userReducer';

const rootReducer =  combineReducers({
  courses: courseReducer,
  user: userReducer,
  routing: routerReducer
});

export default rootReducer;
