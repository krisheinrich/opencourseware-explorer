import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';

class App extends Component {

  render() {
    return (
      <div>
        <nav>
          <ul id="nav-list">
            <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
            <li><Link to="/categories" activeClassName="active">Categories</Link></li>
            <li><Link to="/saved" activeClassName="active">My Courses</Link></li>
          </ul>
        </nav>
        <br/>
        { this.props.isFetching
          ? <Spinner className="center-content" spinnerName="three-bounce" />
          : this.props.children
        }
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  isFetching: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isFetching: state.categories.isFetching
  };
}

export default connect(
  mapStateToProps
)(App);
