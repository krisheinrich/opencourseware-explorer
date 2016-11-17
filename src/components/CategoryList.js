import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import NumberFormatter from '../utils/numberFormatter';

// For each category, render an <li> that can toggle to show its subcategories

const CategoryList = ({categories, onCategoryClick}) => {
  return (<ul className="category-list">
    {
      Object.keys(categories).map((id, index) =>
        <li key={index}>
          <Link to={"/category/"+id}
            onClick={event => onCategoryClick(event, id)}>
            <span className="category-name">{categories[id].name} ({NumberFormatter.format(categories[id].count)})</span>
            <div className="subcategories">
              { categories[id].children.map((text, index) => (
                  <span key={index} style={{display: "inline-block"}}>
                    {text}&nbsp;
                    { (index !== categories[id].children.length-1) && "\u2219" }&nbsp;
                  </span>
                ))
              }
            </div>
          </Link>
        </li>
      )
    }
  </ul>);
};

CategoryList.propTypes = {
  categories: PropTypes.object.isRequired,
  onCategoryClick: PropTypes.func.isRequired
};

export default CategoryList;
