import React, { Component, PropTypes } from 'react';
//import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import Spinner from 'react-spinkit';
import CategoryList from '../components/CategoryList';

class CategoriesPage extends Component {
  /*
  static handleLoadCourses = (event, id) => {
    event.preventDefault();
    browserHistory.push('/category/' + id);
  };
  */

  render() {
    return (this.props.isFetching)
    ? <Spinner spinnerName="three-bounce" />
    : <main id="categories-page">
        <h1>Browse Courses By Category</h1>
        <CategoryList
          categories={this.props.categories}
          //onCategoryClick={this.handleLoadCourses}
        />
      </main>;
  }
}

CategoriesPage.propTypes = {
  categories: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired
};

// Subscribe component to Redux store updates

function mapStateToProps(state) {
  return {
    categories: state.categories.byId,
    isFetching: state.categories.isFetching
  };
}

export default connect(
  mapStateToProps
)(CategoriesPage);
