/*import React, { PropTypes } from 'react';


const CategoryListItem = ({ name, id, count, loadCourses }) => {

  const onCategoryClick = (event) => {
    event.preventDefault();
    loadCourses(id);
  };

  return (
    <li>
      <Link to={"/category/"+id} onClick={onCategoryClick}>{name}</Link>
      ({NumberFormatter.format(count)})
      <i className="fa fa-minus-square fa-pull-right" />
    </li>
  );
};

CategoryListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  loadCourses: PropTypes.func.isRequired
};

export default CategoryListItem;
*/
