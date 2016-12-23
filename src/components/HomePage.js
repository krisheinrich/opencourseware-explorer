import React from 'react';
import { Link } from 'react-router';
import SearchBar from './SearchBar';

const HomePage = () => {
  return (
    <main id="home-page">
      <h1 id="site-title">Open Education Classroom</h1>
      <h2 id="tagline">Free University-Level Course Materials</h2>
      <SearchBar />
      <h3 id="browse-link">...or <Link to="/categories">Browse courses by Subject</Link></h3>
    </main>
  );
};

export default HomePage;
