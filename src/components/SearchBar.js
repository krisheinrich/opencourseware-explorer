import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {value: this.props.query || ''};
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
      <form onSubmit={this.handleSubmit} className="search-form">
        <input type="text" value={this.state.value}
          onChange={this.handleChange}
          placeholder="Search for courses"
        />
        <button type="submit" className="btn btn-success">
          <i className="fa fa-search"/>
        </button>
      </form>
    );
  }
}

SearchBar.propTypes = {
  query: PropTypes.string
};

export default SearchBar;
