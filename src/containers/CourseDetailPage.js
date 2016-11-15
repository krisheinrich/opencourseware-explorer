import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/courseActions';

import Spinner from 'react-spinkit';

class CourseDetailPage extends Component {
  componentDidMount() {
    this.props.actions.fetchCourseDetails(this.props.hash);
  }
  // Re-renders whenever store is changed by dispatch and props are subsequently updated
  render() {
    if (this.props.isFetching) {
      return <Spinner spinnerName="three-bounce" />;
    } else {
      /* eslint-disable react/no-danger */
      return (
        <main>
          <h2><a href={this.props.course.url}>{this.props.course.name}</a></h2>
          <h3>{this.props.course.author}</h3>
          <p dangerouslySetInnerHTML={{__html: this.props.course.description}}/>
          <p>{this.props.course.categories.join(", ")}</p>
        </main>
      );
      /* eslint-enable react/no-danger */
    }
  }
}

CourseDetailPage.propTypes = {
  actions: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  hash: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired
};

// Subscribe component to Redux store updates

function mapStateToProps(state, ownProps) {
  return {
    course: state.courses.displayedCourse,
    hash: ownProps.params.id,
    isFetching: state.courses.isFetching,
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
)(CourseDetailPage);