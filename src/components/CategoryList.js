import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import NumberFormatter from '../utils/numberFormatter';

// For each category, render an <li> that can toggle to show its subcategories

const CategoryList = ({categories, onCategoryClick, onIconClick}) => {


  return (
    <ul className="top-list">
      {Object.keys(categories).map((id, index) => (
        <li key={index}>
          <div>
          {categories[id].children.length > 0 &&
            <i className={"fa fa-pull-left "+(categories[id].isOpen ? "fa-minus-square" : "fa-plus-square")}
              onClick={() => onIconClick(id)} />
          }

            <Link to={"/category/"+id}
              onClick={event => onCategoryClick(event, id)}>
              {categories[id].name}
            </Link> ({NumberFormatter.format(categories[id].course_count)})
          </div>
          <div className={categories[id].isOpen ? "open" : "closed"}>
            <ul className="subcategory-list">
            {categories[id].children.map((subcat, index) => (
              <li key={index}>
                <Link to={"/category/"+subcat.category_id}
                  onClick={event => onCategoryClick(event, subcat.category_id)}>
                  {categories[id].children[index].name}
                </Link> ({NumberFormatter.format(categories[id].children[index].course_count)})
              </li>
            ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
};

CategoryList.propTypes = {
  categories: PropTypes.object.isRequired,
  onCategoryClick: PropTypes.func.isRequired,
  onIconClick: PropTypes.func.isRequired
};

export default CategoryList;
