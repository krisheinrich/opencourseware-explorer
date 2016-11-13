import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/courseActions';

import Spinning from 'spinning';
import CourseListItem from '../components/CourseListItem';

class CategoryCoursesPage extends Component {
  componentDidMount() {
    if (Object.keys(this.props.categories).length === 0) {
      this.props.actions.fetchCategoryList();
    }
    if (this.props.courses.length === 0) {
      this.props.actions.fetchCategoryCourseList(this.props.categoryName, this.props.categoryId);
    }
  }
  render() {
    // Re-renders whenever store is changed by dispatch and props are subsequently updated
    if (this.props.isFetching) {
      CategoryCoursesPage.spinner = Spinning().text('loading...').light().size(150);
      return null;
    } else {
      if (CategoryCoursesPage.spinner) CategoryCoursesPage.spinner.remove();
      return (
        <main>
          <h2>{this.props.categoryName}</h2>
          <a href="#" onClick={this.props.prev ? this.props.actions.fetchCategoryLink(this.props.prev, this.props.categoryName): null}>Previous</a>
          {" | "}
          <a href="#" onClick={this.props.next ? this.props.actions.fetchCategoryLink(this.props.next, this.props.categoryName) : null}>Next</a>
          <ul id="category-course-list">
            {this.props.courses.map(({ title, author, linkhash }, index) =>
              <CourseListItem
                key={index}
                name={title}
                author={author}
                hash={linkhash}
              />
            )}
          </ul>
        </main>
      );
    }
  }
}

CategoryCoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  categoryId: PropTypes.string.isRequired,
  categoryName: PropTypes.string.isRequired,
  courses: PropTypes.array.isRequired,
  next: PropTypes.string,
  prev: PropTypes.string,
  isFetching: PropTypes.bool.isRequired
};

// Subscribe component to Redux store updates

function mapStateToProps(state, ownProps) {
  return {
    categories: state.courses.categories,
    categoryId: ownProps.params.id,
    categoryName: state.courses.categories[ownProps.params.id].name,
    courses: state.courses.displayedCategory.courses,
    next: state.courses.next,
    prev: state.courses.prev,
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
)(CategoryCoursesPage);
