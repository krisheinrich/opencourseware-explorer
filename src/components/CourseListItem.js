import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const CourseListItem = ({ hash, name, author, isSaved, saveCourse }) => (
  <li>
    <i title="Bookmark course" className={isSaved ? "fa fa-bookmark" : "fa fa-bookmark-o"} onClick={() => saveCourse(hash)}/>
    <Link to={`/course/${hash}`} dangerouslySetInnerHTML={{__html: name}} />
    <br />
    {author}
  </li>
);

CourseListItem.propTypes = {
  name: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  isSaved: PropTypes.bool.isRequired,
  saveCourse: PropTypes.func.isRequired
};

export default CourseListItem;
