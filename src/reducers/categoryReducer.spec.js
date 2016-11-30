import { expect } from 'chai';
import * as actions from '../actions/categoryActions';
import categoryReducer from './categoryReducer';
import initialState from './initialState';

describe("Categories Reducer: ", function () {

  describe("if fetch is successful,", function() {

    // Example of response JSON - array of category objects
    const categoryList = [
      {
        "name": "Arts",
        "category_id": "2175",
        "course_count": 1898,
        "children": [
          {"name":"Ceramics","category_id":"525657","course_count":11},
          {"name":"Drawing and Painting","category_id":"525667","course_count":35},
          {"name":"Fiber","category_id":"525663","course_count":8},
          {"name":"Metal and Jewelry","category_id":"525660","course_count":3},
          {"name":"Printmaking","category_id":"525659","course_count":3},
          {"name":"Sculpture","category_id":"525658","course_count":7}
        ]
      }
    ];
    const newState = categoryReducer(initialState.categories, actions.getCategoryListSuccess(categoryList));

    it('should return object storing category title and count', function () {
      expect(newState.byId[2175]).to.have.property('name', 'Arts');
      expect(newState.byId[2175]).to.have.property('count', 1898);
    });

    it('should persist pre-defined subcategory list data', function () {
      expect(newState.byId[2175]).to.have.property('children')
        .that.is.an('array')
        .that.includes('Media Studies');
    });
  });

  describe("if fetch is unsuccessful,", function() {
    let err = new Error("Category fetch failed");
    function callFailingAction() {
      categoryReducer(initialState, actions.getCategoryListError(err));
    }

    it('should throw the received error', function () {
      expect(callFailingAction).to.throw(err);
    });
  });
});
