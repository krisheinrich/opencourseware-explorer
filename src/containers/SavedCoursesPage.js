import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/courseActions';
import CourseListItem from '../components/CourseListItem';

class ProfilePage extends Component {

  constructor(props) {
    super(props);
    this.handleSaveCourseId = this.handleSaveCourseId.bind(this);
  }

  handleSaveCourseId(hash) {
    return () => {
      this.props.actions.toggleSavedCourse(hash);
    };
  }

  render() {
    const {name, email, savedCourses, coursesByHash} = this.props;
    return (
      <main id="saved-courses-page">
        <h2>My Courses</h2>
        {[name, email]}
        <ul className="mySavedCourses">
          {savedCourses.map((hash, index) =>
            <CourseListItem
              key={index}
              hash={hash}
              name={coursesByHash[hash].name}
              author={coursesByHash[hash].name}
              isSaved={true}
              saveCourseId={this.handleSaveCourseId}
            />
          )}
        </ul>
      </main>
    );
  }
}

ProfilePage.propTypes = {
  actions: PropTypes.object.isRequired,
  name: PropTypes.string,
  email: PropTypes.string.isRequired,
  savedCourses: PropTypes.array.isRequired,
  coursesByHash: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    name: state.user.name,
    email: state.user.email,
    savedCourses: state.user.savedCourses,
    coursesByHash: state.courses.byHash
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
