import React, { PropTypes } from 'react';
import {  Link, IndexLink } from 'react-router';
import Spinner from 'react-spinkit';

class App extends React.Component {
  render() {
    const { store } = this.context;

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
      { Object.keys(store.getState().courses.categories).length === 0
          ? <Spinner className="center-content" spinnerName="three-bounce" />
          : this.props.children
        }
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

App.contextTypes = {
  store: PropTypes.object.isRequired
};

export default App;
