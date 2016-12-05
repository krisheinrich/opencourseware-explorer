import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/courseActions';
import CourseList from '../components/CourseList';

class ProfilePage extends Component {

  constructor(props) {
    super(props);
    this.handleSaveCourseId = this.handleSaveCourseId.bind(this);
    this.determineIfSaved = this.determineIfSaved.bind(this);
  }

  determineIfSaved(hash) {
    return this.props.savedCourseIds.indexOf(hash) > -1;
  }

  handleSaveCourseId(hash) {
    this.props.actions.toggleSavedCourse(hash);
  }

  render() {
    const {courses} = this.props;
    return (
      <main id="saved-courses-page">
        <h1>My Courses</h1>
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
  savedCourseIds: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    savedCourseIds: state.user.savedCourses,
    courses: state.user.savedCourses.map(hash => (state.courses.byHash[hash]) || {})
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
