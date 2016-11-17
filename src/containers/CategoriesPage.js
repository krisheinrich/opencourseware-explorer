import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/courseActions';

import Spinner from 'react-spinkit';
import CategoryList from '../components/CategoryList';

class CategoriesPage extends Component {
  /*
  componentDidMount() {
    // make sure
    if (Object.keys(this.props.categories).length === 0 && !this.props.isFetching) {  // && !this.props.isFetching
      this.props.actions.fetchCategoryList();
    }
  }
  */
  handleLoadCourses() {
    return (event, id) => {
      event.preventDefault();
      this.props.actions.fetchCategoryCourseListFromId(id).then(() => browserHistory.push('/category/' + id));
    };
  }

  render() {
    if (this.props.isFetching) {
      return <Spinner spinnerName="three-bounce" />;
    }

    return (
      <main id="categories-page">
        <h1>Browse Courses By Category</h1>
        <CategoryList
          categories={this.props.categories}
          onCategoryClick={this.handleLoadCourses()}
        />
      </main>
    );
  }
}

CategoriesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired
};

// Subscribe component to Redux store updates

function mapStateToProps(state) {
  return {
    categories: state.courses.categories,
    isFetching: state.courses.isFetching
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesPage);
