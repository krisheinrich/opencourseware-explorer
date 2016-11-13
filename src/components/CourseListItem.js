import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const CourseListItem = ({ hash, name, author }) => {
  return (
    <li>
      <Link to={'/course/'+hash}>{name}</Link>
      <br/>
      {author}
    </li>
  );
};

CourseListItem.propTypes = {
  name: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
};

export default CourseListItem;

//  onClick={this.props.actions.saveCourseId.bind(null, this.props.hash)}
