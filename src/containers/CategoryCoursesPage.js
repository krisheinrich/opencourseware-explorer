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
    if (!this.props.count && !this.props.isFetching) {  // || Object.keys(this.props.categories).length === 0
      this.props.actions.fetchCategoryCourseListFromId(this.props.categoryId);
    }
  }
  componentWillReceiveProps() {
    if (!this.props.count) {  // || Object.keys(this.props.categories).length === 0
      this.props.actions.fetchCategoryCourseListFromId(this.props.categoryId);
    }
  }
  determineIfSaved(hash) {
    return this.props.savedCourses.indexOf(hash) > -1;
  }

  handleSaveCourseId(hash) {
    return () => {
      this.props.actions.toggleSavedCourse(hash);
    };
  }

  handlePaginationClick(pageUrl) {
    this.props.actions.fetchCategoryCourseListFromURL(pageUrl, this.props.categoryId);
  }

/*if (Object.keys(this.props.categories).length === 0) {
  // wait for categories to load in store
  return null;
} else */
  render() {
    if (!this.props.count) {
      // state.courses.displayedCategory not set (GET_CATEGORY_COURSE_LIST hasn't finished)
      /*
      if (!this.props.categoryName) {  //  || this.props.categoryName !== this.props.categories[this.props.categoryId].name
        this.props.actions.fetchCategoryCourseListFromId(this.props.categoryId);
      } */
      return <Spinner spinnerName="three-bounce" />;
    }

    return (
      <main id="category-courses-page">
        <h1>{this.props.categoryName}</h1>
        <CoursePagination
          prevUrl={this.props.prev}
          nextUrl={this.props.next}
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
  categories: PropTypes.object.isRequired,
  categoryId: PropTypes.string.isRequired,
  categoryName: PropTypes.string.isRequired,
  courses: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  next: PropTypes.string,
  prev: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  savedCourses: PropTypes.array.isRequired
};

// Subscribe component to Redux store updates

function mapStateToProps(state, ownProps) {
  return {
    categories: state.courses.categories,
    categoryId: ownProps.params.id,
    categoryName: state.courses.displayedCategory.name,
    courses: state.courses.displayedCategory.courses,
    count: state.courses.displayedCategory.count,
    next: state.courses.displayedCategory.next,
    prev: state.courses.displayedCategory.prev,
    isFetching: state.courses.isFetching,
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
