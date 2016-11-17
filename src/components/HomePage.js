import React from 'react';
import { Link } from 'react-router';

const HomePage = () => {
  return (
    <div>
      <h1>Open Education Classsroom</h1>
      <h2>Free University-Level Course Materials</h2>
      <h3>Browse Available Courses:</h3>
      <ul>
        <li><Link to="/categories">Browse by Subject</Link></li>
        <li>Search for Course</li>
      </ul>
    </div>
  );
};

export default HomePage;
