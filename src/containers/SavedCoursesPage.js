import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/courseActions';

import CoursePagination from '../components/CoursePagination';
import CourseList from '../components/CourseList';

class ProfilePage extends Component {

  constructor(props) {
    super(props);
    this.handleSaveCourseId = this.handleSaveCourseId.bind(this);
    this.determineIfSaved = this.determineIfSaved.bind(this);
    this.handlePaginationClick = this.handlePaginationClick.bind(this);
    this.props.actions.changeSavedCoursesPage(1);
  }

  determineIfSaved(hash) {
    return this.props.savedCourseIds.indexOf(hash) > -1;
  }

  handleSaveCourseId(hash) {
    this.props.actions.toggleSavedCourse(hash);
  }

  handlePaginationClick(pageNum) {
    this.props.actions.changeSavedCoursesPage(pageNum);
  }

  render() {
    const {courses, currentPage, totalPages} = this.props;
    return (
      <main id="saved-courses-page">
        <div className="results-header">
          <div className="container">
            <h1>My Courses</h1>
            { totalPages > 1 &&
              <CoursePagination
                onPaginationClick={this.handlePaginationClick}
                currentPage={currentPage}
                totalPages={totalPages}
              />
            }
          </div>
        </div>
        { courses.length === 0
        ? <p><em>{"Courses you bookmark will appear here for easy access."}</em></p>
        :  <CourseList
            courses={courses}
            toggleSavedCourse={this.handleSaveCourseId}
            isSaved={this.determineIfSaved}
          />
        }
      </main>
    );
  }
}

ProfilePage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  savedCourseIds: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    savedCourseIds: state.user.savedCourses,
    courses: actions.getSavedCoursesByPage(state, state.user.currentPage),
    totalPages: state.user.totalPages,
    currentPage: state.user.currentPage || 1
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
