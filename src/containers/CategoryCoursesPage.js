import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/courseActions';

//import Spinning from 'spinning';
import CourseListItem from '../components/CourseListItem';

class CategoryCoursesPage extends Component {
  componentDidMount() {

  }
  render() {
    if (this.props.isFetching) {
      if (!this.props.categoryName) {  //  || this.props.categoryName !== this.props.categories[this.props.categoryId].name
        this.props.actions.fetchCategoryCourseListFromId(this.props.categoryId);
      }
      return null;
    } else {
      return (
        <main>
          <h2>{this.props.categoryName}</h2>
          <div className="center-content">
            <button disabled={!this.props.prev} onClick={this.props.actions.fetchCategoryCourseListFromURL.bind(this, this.props.prev, this.props.categoryId)}>
              Previous
            </button>
            {" | "}
            <button disabled={!this.props.next} onClick={this.props.actions.fetchCategoryCourseListFromURL.bind(this, this.props.next, this.props.categoryId)}>
              Next
            </button>
          </div>
          <ul className="top-list">
            {this.props.courses.map(({ title, author, linkhash }, index) =>
              <CourseListItem
                key={index}
                name={title}
                author={author}
                hash={linkhash}
              />
            )}
          </ul>
        </main>
      );
    }
  }
}

CategoryCoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  categoryId: PropTypes.string.isRequired,
  categoryName: PropTypes.string.isRequired,
  courses: PropTypes.array.isRequired,
  next: PropTypes.string,
  prev: PropTypes.string,
  isFetching: PropTypes.bool.isRequired
};

// Subscribe component to Redux store updates

function mapStateToProps(state, ownProps) {
  return {
    categories: state.courses.categories,
    categoryId: ownProps.params.id,
    categoryName: state.courses.displayedCategory.name,
    courses: state.courses.displayedCategory.courses,
    next: state.courses.displayedCategory.next,
    prev: state.courses.displayedCategory.prev,
    isFetching: state.courses.isFetching
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
)(CategoryCoursesPage);
