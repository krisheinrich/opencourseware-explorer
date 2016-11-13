import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const SubjectListItem = ({ name, id, count }) => {
  return (
    <li><Link to={"/category/"+id}>{name} ({count})</Link></li>
  );
};

SubjectListItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired
};

export default SubjectListItem;
