import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const CourseListItem = ({ hash, name, author, isSaved, saveCourseId }) => (
  <li>
    <i className={isSaved ? "fa fa-bookmark" : "fa fa-bookmark-o"} onClick={saveCourseId(hash)}/>
    <Link to={'/course/'+hash} dangerouslySetInnerHTML={{__html: name}} />
    <br />
    {author}
  </li>
);

CourseListItem.propTypes = {
  name: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  isSaved: PropTypes.bool.isRequired,
  saveCourseId: PropTypes.func.isRequired
};

export default CourseListItem;

//  onClick={this.props.actions.saveCourseId.bind(null, this.props.hash)}
