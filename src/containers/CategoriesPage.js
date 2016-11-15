import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/courseActions';

import Spinner from 'react-spinkit';
import CategoryList from '../components/CategoryList';

class CategoriesPage extends Component {
  handleLoadCourses() {
    return (event, id) => {
      event.preventDefault();
      this.props.actions.fetchCategoryCourseListFromId(id);
    };
  }

  render() {
    // Categories should be pre-loaded, but load if they aren't
    if (Object.keys(this.props.categories).length === 0) {
      if (this.props.isFetching) {
        return <Spinner className="center-content" spinnerName="three-bounce" />;
      } else {
        this.props.actions.fetchCategoryList();
        return null;
      }
    }

    return (
      <CategoryList
        categories={this.props.categories}
        onCategoryClick={this.handleLoadCourses()}
        onIconClick={this.props.actions.toggleSubcategories}
      />
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
