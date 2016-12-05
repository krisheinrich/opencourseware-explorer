import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const CategoryList = ({categories}) => (
  <ul className="category-list">
    {
      Object.keys(categories).map((id, index) =>
        <li key={index}>
          <Link to={"/category/"+id}>
            <span className="category-name">{categories[id].name}</span>
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
  </ul>
);

CategoryList.propTypes = {
  categories: PropTypes.object.isRequired,
};

export default CategoryList;
