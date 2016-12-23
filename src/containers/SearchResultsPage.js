import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as searchActions from '../actions/searchActions';
import * as courseActions from '../actions/courseActions';
import NumberFormatter from '../utils/numberFormatter';

import SearchBar from '../components/SearchBar';
import CoursePagination from '../components/CoursePagination';
import CourseList from '../components/CourseList';

class SearchResultsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {isFetchingNewQuery: true};
    this.handlePaginationClick = this.handlePaginationClick.bind(this);
    this.handleSaveCourseId = this.handleSaveCourseId.bind(this);
    this.determineIfSaved = this.determineIfSaved.bind(this);
  }
  componentDidMount() {
    if (!this.props.isFetching) {
        this.props.searchActions.fetchSearchResults(this.props.query);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.query !== this.props.query) {
      this.setState({isFetchingNewQuery: true});
      this.props.searchActions.fetchSearchResults(nextProps.query);
    } else if (nextProps.isFetching === false) {
      this.setState({isFetchingNewQuery: false});
    }
  }
  determineIfSaved(hash) {
    return this.props.savedCourses.indexOf(hash) > -1;
  }

  handleSaveCourseId(hash) {
    return this.props.courseActions.toggleSavedCourse(hash);
  }

  handlePaginationClick(pageNum) {
    //browserHistory.push(`/search/${this.props.query}`);
    this.props.searchActions.fetchSearchResults(this.props.query, pageNum);
  }

  render() {
    const {query, courses, count, currentPage, totalPages, isFetching} = this.props;
    return (
      <main id="search-results-page">
        <div className="results-header">
          <div className="container">
            <SearchBar query={query}/>
            <CoursePagination
              isFetching={isFetching}
              isFetchingNewQuery={this.state.isFetchingNewQuery}
              onPaginationClick={this.handlePaginationClick}
              currentPage={currentPage}
              totalPages={totalPages}
            />
            <div id="result-count">
              { (count > 0 && !this.state.isFetchingNewQuery) &&
                `${NumberFormatter.format(count)} results for '${query}'`
              }
            </div>
          </div>
        </div>
        { !isFetching && count === 0
        ? <p><em>No courses found.</em></p>
        : <CourseList
            courses={courses}
            toggleSavedCourse={this.handleSaveCourseId}
            isSaved={this.determineIfSaved}
            isNewResult={this.state.isFetchingNewQuery}
          />
        }
      </main>
    );
  }
}

SearchResultsPage.propTypes = {
  searchActions: PropTypes.object.isRequired,
  courseActions: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  categories: PropTypes.object.isRequired,
  query: PropTypes.string.isRequired,
  //isCached: PropTypes.bool.isRequired,
  courses: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  savedCourses: PropTypes.array.isRequired
};

// Subscribe component to Redux store updates

function mapStateToProps(state, ownProps) {
  //const isCached = state.pagination.bySearch.courseIdsByQueryPage.hasOwnProperty(query) && state.pagination.bySearch.courseIdsByQueryPage[query].hasOwnProperty(currentPage);
  return {
    isFetching: state.pagination.bySearch.isFetching,
    categories: state.categories.byId,
    query: ownProps.params.query,
    //isCached,
    courses: state.pagination.bySearch.courseIds.map(hash => state.courses.byHash[hash]),
    //isCached ? state.pagination.bySearch.courseIdsByQueryPage[query][currentPage].map(hash => state.courses.byHash[hash]) : [],
    count: state.pagination.bySearch.count,
    currentPage: state.pagination.bySearch.currentPage,
    totalPages: state.pagination.bySearch.totalPages,
    savedCourses: state.user.savedCourses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchActions: bindActionCreators(searchActions, dispatch),
    courseActions: bindActionCreators(courseActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResultsPage);
