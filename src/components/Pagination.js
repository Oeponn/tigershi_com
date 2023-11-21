import React from 'react';

export default function Pagination(props) {
  return (
    <div className="pagination-container">
      <button onClick={() => props.changePageNum(props.pageNum - 1)} className="back-button">
    Prev
      </button>
        Page {props.pageNum}
      <button onClick={() => props.changePageNum(props.pageNum + 1)} className="forward-button">
      Next
      </button>
    </div>
  );
}
