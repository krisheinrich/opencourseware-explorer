import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/courseActions';

import { withRouter } from 'react-router';

import Spinner from 'react-spinkit';
import CoursePagination from '../components/CoursePagination';
import CourseListItem from '../components/CourseListItem';

class CategoryCoursesPage extends Component {
  constructor(props) {
    super(props);
    this.handlePaginationClick = this.handlePaginationClick.bind(this);
    this.handleSaveCourseId = this.handleSaveCourseId.bind(this);
  }
  componentDidMount() {
    // Action to get course list hasn't been dispatched if user loads the page directly (vs via <Link />)
    //if (!this.props.count && !this.props.isFetching) {  // || Object.keys(this.props.categories).length === 0
    this.props.actions.fetchCategoryCourseList(this.props.categoryId);
    //}
  }
  componentWillReceiveProps() {
    /*
    if (!this.props.isFetching) {  // || Object.keys(this.props.categories).length === 0
      this.props.actions.fetchCategoryCourseList(this.props.categoryId, this.props.currentPage);
    }
    */
  }
  determineIfSaved(hash) {
    return this.props.savedCourses.indexOf(hash) > -1;
  }

  handleSaveCourseId(hash) {
    return () => {
      this.props.actions.toggleSavedCourse(hash);
    };
  }

  handlePaginationClick(pageNumber) {
    this.props.actions.fetchCategoryCourseList(this.props.categoryId, pageNumber);
  }

  render() {
    if (this.props.isFetching) {
      return <Spinner spinnerName="three-bounce" />;
    }

    return (
      <main id="category-courses-page">
        <h1>{this.props.categoryName}</h1>
        <CoursePagination
          currentPage={this.props.currentPage}
          totalPages={this.props.totalPages}
          onPaginationClick={this.handlePaginationClick}
        />
        { this.props.count === 0
        ? <p><em>No course data found.</em></p>
        : <ul className="category-course-list">
            {this.props.courses.map(({ title, author, linkhash }, index) => (
              <CourseListItem
                key={index}
                hash={linkhash}
                name={title}
                author={author}
                isSaved={this.determineIfSaved(linkhash)}
                saveCourseId={this.handleSaveCourseId}
              />
            ))}
          </ul>
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
    courses: state.pagination.byCategory.courses,
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
