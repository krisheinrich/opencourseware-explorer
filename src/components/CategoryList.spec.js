import React from 'react';
import { expect } from 'chai';
import { mount, } from 'enzyme';
import CategoryList from './CategoryList';
import * as actions from '../actions/courseActions';


function setup() {
  const props = {
    categories: [{
      name: 'Math & Science',
      id: '2114',
      count: 1312482
    }],
    onCategoryClick: (event, id) => {
      event.preventDefault();
      actions.fetchCategoryCourseListFromId(id);
    }
  };

  return mount(<CategoryList {...props} />);
}

const wrapper = setup();

describe("<CategoryList />", function () {
  it('displays the category names as <Link /> components', function () {
    expect(wrapper.find('Link').render().text()).to.equal('Math & Science');
  });
  it('displays the properly formatted number of courses for a category', function () {
    const expectedEnd = / \(1,312,482\)$/;
    expect(wrapper.find('li').text()).to.match(expectedEnd);
  });
});
