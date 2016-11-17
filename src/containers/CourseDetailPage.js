import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/courseActions';

import Spinner from 'react-spinkit';

class CourseDetailPage extends Component {
  componentDidMount() {
    this.props.actions.fetchCourseDetails(this.props.hash);
  }
  /*
  componentWillReceiveProps(nextProps) {
    if (nextProps.hash !== this.props.hash) {
      this.props.actions.fetchCourseDetails(this.props.hash);
    }
  }
  */
  // Re-renders whenever store is changed by dispatch and props are subsequently updated
  render() {
    const { store } = this.context;

    if (this.props.isFetching || !store.getState().courses.displayedCourse.name) {
      return <Spinner spinnerName="three-bounce" />;
    } else {
      /* eslint-disable react/no-danger */
      return (
        <main id="course-details-page">
          <span className="glyph-anchor" />
          <h2>
            <a className="course-title" href={this.props.course.url}>{this.props.course.name}</a>
          </h2>
          <h3>{this.props.course.author}</h3>
          <div id="course-details">
            <span className="course-detail-label">Course Description:</span>
            <p dangerouslySetInnerHTML={{__html: this.props.course.description}}/>
            { this.props.course.provider &&
              <p><span className="course-detail-label">Provider:</span> {this.props.course.provider}</p>
            }
            <p><span className="course-detail-label">Tags:</span> {this.props.course.categories.slice(1).join(", ")}</p>
          </div>
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

CourseDetailPage.contextTypes = {
  store: PropTypes.object.isRequired
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
