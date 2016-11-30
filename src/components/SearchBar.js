import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    browserHistory.push('/search/' + this.state.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Search courses"/>
        <input type="submit" value="Search" />
      </form>
    );
  }
}

export default SearchBar;
