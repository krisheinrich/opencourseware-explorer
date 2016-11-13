import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/courseActions';

import Spinning from 'spinning';
import SubjectListItem from '../components/SubjectListItem';

class CategoriesPage extends Component {
  componentDidMount() {
    // Call only once and cache to store
    if (Object.keys(this.props.categories).length === 0) {
      this.props.actions.fetchCategoryList();
    }
  }
  render() {
    // Re-renders whenever store is changed by dispatch and props are subsequently updated
    if (this.props.isFetching) {
      CategoriesPage.spinner = Spinning().text('loading...').light().size(150);
      return null;
    } else {
      if (CategoriesPage.spinner) CategoriesPage.spinner.remove();
      return (
        <ul id="category-list">
          {Object.keys(this.props.categories).map((id, index) =>
            <SubjectListItem
              key={index}
              id={this.props.categories[id].category_id.toString()}
              name={this.props.categories[id].name}
              count={this.props.categories[id].course_count}
            />
          )}
        </ul>
      );
    }
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
