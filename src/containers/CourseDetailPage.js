import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/courseActions';

import Spinner from 'react-spinkit';

class CourseDetailPage extends Component {
  constructor(props) {
    super(props);
    this.handleSaveCourseId = this.handleSaveCourseId.bind(this);
  }
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
  handleSaveCourseId(hash) {
    return this.props.actions.toggleSavedCourse(hash);
  }
  // Re-renders whenever store is changed by dispatch and props are subsequently updated
  render() {
    if (this.props.isFetching || !this.props.course.categories) {
      return <Spinner spinnerName="three-bounce" />;
    }
    /* eslint-disable react/no-danger */
    return (
      <main id="course-details-page">
        <i title="Bookmark course" className={this.props.isSaved ? "fa fa-bookmark" : "fa fa-bookmark-o"} onClick={() => this.handleSaveCourseId(this.props.hash)}/>
        <h2>{this.props.course.name}</h2>
        <a href={this.props.course.url} target="_blank"><i title="Visit course page" className={"fa fa-share-square"} /></a>
        <h3>{this.props.course.author}</h3>
        <div id="course-details">
          <span className="course-detail-label">Course Description:</span>
          <p dangerouslySetInnerHTML={{__html: this.props.course.description}}/>
          { this.props.course.provider &&
            <p><span className="course-detail-label">Provider:</span> {this.props.course.provider}</p>
          }
          <p><span className="course-detail-label">Tags:</span> {this.props.course.categories.join(", ")}</p>
        </div>
      </main>
    );
    /* eslint-enable react/no-danger */
  }
}

CourseDetailPage.propTypes = {
  actions: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  hash: PropTypes.string.isRequired,
  isSaved: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired
};

// Subscribe component to Redux store updates

function mapStateToProps(state, ownProps) {
  return {
    course: state.courses.byHash[ownProps.params.id],
    hash: ownProps.params.id,
    isSaved: state.user.savedCourses.indexOf(ownProps.params.id) > -1,
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
