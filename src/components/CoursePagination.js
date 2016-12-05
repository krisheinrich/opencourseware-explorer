import React, { PropTypes } from 'react';

const CoursePagination = ({currentPage, totalPages, isFetching, onPaginationClick}) => (
  <div className="pagination">
    <button disabled={!currentPage || currentPage===1} onClick={() => onPaginationClick(currentPage-1)}>
      <i className="fa fa-angle-left fa-2x"/>
    </button>
    <div>
      { totalPages !== 0 &&
        (!isFetching && currentPage
        ? `${currentPage} / ${totalPages}`
        : `-- / ${totalPages}`
        )
      }
    </div>
    <button disabled={currentPage===totalPages} onClick={() => onPaginationClick(currentPage+1)}>
      <i className="fa fa-angle-right fa-2x"/>
    </button>
  </div>
);

// prevUrl and nextUrl may be null, so not required
CoursePagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  isFetching: PropTypes.bool,
  onPaginationClick: PropTypes.func.isRequired
};

export default CoursePagination;
