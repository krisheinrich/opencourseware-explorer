import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/courseActions';

import { withRouter } from 'react-router';

import CoursePagination from '../components/CoursePagination';
import CourseList from '../components/CourseList';

class CategoryCoursesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {isNewCategory: true};
    this.determineIfSaved = this.determineIfSaved.bind(this);
    this.handlePaginationClick = this.handlePaginationClick.bind(this);
    this.handleSaveCourseId = this.handleSaveCourseId.bind(this);
  }
  componentDidMount() {
    this.props.actions.fetchCategoryCourseList(this.props.categoryId);
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.isFetching) {
      this.props.actions.fetchCategoryCourseList(this.props.categoryId, this.props.currentPage);
    }
    if (nextProps.categoryId !== this.props.categoryId) {
      this.setState({isNewCategory: true});
    } else if (nextProps.isFetching === false) {
      this.setState({isNewCategory: false});
    }
  }
  determineIfSaved(hash) {
    return this.props.savedCourses.indexOf(hash) > -1;
  }
  handleSaveCourseId(hash) {
    this.props.actions.toggleSavedCourse(hash);
  }
  handlePaginationClick(pageNumber) {
    this.props.actions.fetchCategoryCourseList(this.props.categoryId, pageNumber);
  }

  render() {
    const {categoryName, currentPage, totalPages, isFetching, count, courses} = this.props;
    return (
      <main id="category-courses-page">
        <div className="results-header">
          <div className="container">
            <h1>{categoryName}</h1>
            <CoursePagination
              currentPage={currentPage}
              totalPages={totalPages}
              isFetching={isFetching}
              isFetchingNewQuery={this.state.isNewCategory}
              onPaginationClick={this.handlePaginationClick}
            />
          </div>
        </div>
        { count === 0
        ? <p><em>No course data found.</em></p>
        : <CourseList
            courses={courses}
            toggleSavedCourse={this.handleSaveCourseId}
            isSaved={this.determineIfSaved}
            isNewResult={this.state.isNewCategory}
          />
        }
      </main>
    );
  }
}

CategoryCoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  categories: PropTypes.object.isRequired,
  categoryId: PropTypes.string.isRequired,
  categoryName: PropTypes.string.isRequired,
  courses: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  savedCourses: PropTypes.array.isRequired
};

// Subscribe component to Redux store updates

function mapStateToProps(state, ownProps) {
  return {
    isFetching: state.pagination.byCategory.isFetching,
    categories: state.categories.byId,
    categoryId: ownProps.params.id,
    categoryName: state.categories.byId[ownProps.params.id].name,
    courses: state.pagination.byCategory.courseIds.map(hash => state.courses.byHash[hash]),
    count: state.pagination.byCategory.count,
    currentPage: state.pagination.byCategory.currentPage,
    totalPages: state.pagination.byCategory.totalPages,
    savedCourses: state.user.savedCourses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryCoursesPage));
