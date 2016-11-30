import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/searchActions';

//import { withRouter } from 'react-router';

import Spinner from 'react-spinkit';
import CoursePagination from '../components/CoursePagination';
import CourseListItem from '../components/CourseListItem';

class SearchResultsPage extends Component {
  constructor(props) {
    super(props);
    this.handlePaginationClick = this.handlePaginationClick.bind(this);
    this.handleSaveCourseId = this.handleSaveCourseId.bind(this);
  }
  componentDidMount() {
    // Action to get course list hasn't been dispatched if user loads the page directly (vs via <Link />)
    if (!this.props.count && !this.props.isFetching) {  // || Object.keys(this.props.categories).length === 0
      this.props.actions.fetchSearchResults(this.props.query);
    }
  }
  componentWillReceiveProps() {
    if (!this.props.count) {  // || Object.keys(this.props.categories).length === 0
      this.props.actions.fetchSearchResults(this.props.query);
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

  handlePaginationClick(pageNum) {
    this.props.actions.fetchSearchResults(this.props.query, pageNum);
  }

  render() {
    if (!this.props.isFetching) {
      return <Spinner spinnerName="three-bounce" />;
    }

    return (
      <main id="search-results-page">
        <div>
          {`Search > ${this.props.query}` }
        </div>
        <CoursePagination
          currentPage={this.props.currentPage}
          totalPages={this.props.totalPages}
          onPaginationClick={this.handlePaginationClick}
        />
        { this.props.count === 0
        ? <p><em>No courses found.</em></p>
        : <ul className="search-results-list">
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

SearchResultsPage.propTypes = {
  actions: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  categories: PropTypes.object.isRequired,
  query: PropTypes.string.isRequired,
  courses: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  savedCourses: PropTypes.array.isRequired
};

// Subscribe component to Redux store updates

function mapStateToProps(state, ownProps) {
  return {
    isFetching: state.pagination.bySearch.isFetching,
    categories: state.categories.byId,
    query: ownProps.params.query,
    courses: state.pagination.bySearch.courses,
    count: state.pagination.bySearch.count,
    currentPage: state.pagination.bySearch.currentPage,
    totalPages: state.pagination.bySearch.totalPages,
    savedCourses: state.user.savedCourses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default //withRouter(
  connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResultsPage);//);
