import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import CategoryList from './CategoryList';
import * as actions from '../actions/courseActions';


function setup() {
  const props = {
    categories: {
      '2214': {
        name: 'Math & Science',
        count: 1312482
      }
    },
    onCategoryClick: (event, id) => {
      event.preventDefault();
      actions.fetchCategoryCourseListFromId(id);
    }
  };

  return shallow(<CategoryList {...props} />);
}

const wrapper = setup();

describe("<CategoryList />", function () {
  it('displays a <Link /> with the category name and properly formatted course count', function () {
    expect(wrapper.find('Link').render().text()).to.equal('Math & Science (1,312,482)');
  });
});
