import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import CategoriesPage from './containers/CategoriesPage';
import CategoryCoursesPage from './containers/CategoryCoursesPage';
import CourseDetailPage from './containers/CourseDetailPage';
import SavedCoursesPage from './containers/SavedCoursesPage';
import NotFoundPage from './components/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="categories" component={CategoriesPage}/>
    <Route path="category/:id" component={CategoryCoursesPage}/>
    <Route path="course/:id" component={CourseDetailPage}/>
    <Route path="saved" component={SavedCoursesPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

// <Route path="profile" component={UserProfilePage}/> (authenticated)
