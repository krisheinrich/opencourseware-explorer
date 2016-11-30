/* eslint-disable import/default */

import React, { PropTypes } from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
import initialState from './reducers/initialState';
import { loadCategories } from './actions/categoryActions';
require('./favicon.ico');  // For Webpack
import './styles/styles.scss';
import { syncHistoryWithStore } from 'react-router-redux';

const store = configureStore(initialState);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

// Populate store with category data on initial load
store.dispatch(loadCategories());

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>, document.getElementById('app')
);

Provider.childContextTypes = {
  store: PropTypes.object
};
