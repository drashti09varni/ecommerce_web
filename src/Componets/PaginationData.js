import React from 'react'
import { PaginationData } from 'react-paginate';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div>
      <PaginationData
      pageCount={totalPages}
      initialPage={currentPage}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={onPageChange}
      containerClassName="pagination justify-content-center mb-0"
      activeClassName="page-item active"
      previousLabel="Previous"
      nextLabel="Next"
      breakLabel="..."
      itemClassName="page-item me-2"
      linkClassName="page-link"
      
    />
    </div>
  )
}

export default Pagination