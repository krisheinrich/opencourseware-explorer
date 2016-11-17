import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const CourseListItem = ({ hash, name, author }) => (
  <li>
    <i className="fa fa-bookmark-o"/>
    <Link to={'/course/'+hash} dangerouslySetInnerHTML={{__html: name}} />
    <br />
    {author}
  </li>
);

CourseListItem.propTypes = {
  name: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
};

export default CourseListItem;

//  onClick={this.props.actions.saveCourseId.bind(null, this.props.hash)}
