import React, { PropTypes } from 'react';

const CoursePagination = ({prevUrl, nextUrl, onPaginationClick}) => (
  <div className="pagination">
    <button disabled={!prevUrl} onClick={() => {onPaginationClick(prevUrl);}}>
      <i className="fa fa-angle-left fa-2x"/>
    </button>
    <button disabled={!nextUrl} onClick={() => {onPaginationClick(nextUrl);}}>
      <i className="fa fa-angle-right fa-2x"/>
    </button>
  </div>
);

// prevUrl and nextUrl may be null, so not required
CoursePagination.propTypes = {
  prevUrl: PropTypes.string,
  nextUrl: PropTypes.string,
  onPaginationClick: PropTypes.func.isRequired
};

export default CoursePagination;
