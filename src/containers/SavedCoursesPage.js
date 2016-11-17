import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class ProfilePage extends Component {
  render() {
    const {name, email, savedCourses} = this.props;
    return (
      <main id="saved-courses-page">
        <h2>My Courses</h2>
        {[name, email, savedCourses]}
      </main>
    );
  }
}

ProfilePage.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string.isRequired,
  savedCourses: PropTypes.array.isRequired
};

function mapStateToProps({ user }) {
  return {
    name: user.name,
    email: user.email,
    savedCourses: user.savedCourses
  };
}

export default connect(mapStateToProps)(ProfilePage);
