import React, { PropTypes } from 'react';
import Spinner from 'react-spinkit';
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CourseListItem from '../components/CourseListItem';

const CourseList = ({courses, toggleSavedCourse, isSaved, isLoading}) => {
  if (isLoading) {
    return <Spinner spinnerName="three-bounce" />;
  }
  return (
    <ul className="course-results-list">
        {courses.length > 0
        ? courses.map(({ name, author, hash }, index) => (
          <CourseListItem
            key={index}
            hash={hash}
            name={name}
            author={author}
            isSaved={isSaved(hash)}
            saveCourse={toggleSavedCourse}
          />))
        : "poop"}
    </ul>
  );
};

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  toggleSavedCourse: PropTypes.func.isRequired,
  isSaved: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

export default CourseList;
