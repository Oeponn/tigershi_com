import React from "react";

export default function Pagination(props) {
	return (
      <div>
      	<button onClick={() => props.changePageNum(props.pageNum - 1)}>
      		Previous
      	</button>
        Page {props.pageNum}
        <button onClick={() => props.changePageNum(props.pageNum + 1)}>
        	Next
      	</button>
      </div>
    );
}