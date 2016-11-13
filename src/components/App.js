import React, { PropTypes } from 'react';
import {  Link, IndexLink } from 'react-router';

class App extends React.Component {
  render() {
    return (
      <div>
        <IndexLink to="/">Home</IndexLink>
        {' | '}
        <Link to="/categories">Categories</Link>
        {' | '}
        <a href="#">My Profile</a>
        <br/>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
