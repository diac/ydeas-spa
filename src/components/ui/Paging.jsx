import React from "react";
import { Link } from "react-router-dom";

const Paging = (props) => {
  const NEIGHBORS = 2;
  const { totalPages } = props;
  const ellipsis = (
    <span className="btn btn-light" disabled>
      ...
    </span>
  );
  const { pageNumber } = props;
  const last = totalPages;

  const pageLink = (page) => {
    return (
      <Link
        className={`btn ${page === pageNumber ? "btn-primary" : "btn-light"}`}
        to={`?page=${page}`}
      >
        {page}
      </Link>
    );
  };

  let links = {
    1: pageLink(1),
    [last]: pageLink(last),
  };

  for (let i = pageNumber - NEIGHBORS; i < pageNumber + NEIGHBORS; i++) {
    if (i > 1 && i < last) {
      links[i] = pageLink(i);
    }
  }

  if (pageNumber - NEIGHBORS > 1) {
    links[pageNumber - NEIGHBORS] = ellipsis;
  }

  if (pageNumber + NEIGHBORS < last) {
    links[pageNumber + NEIGHBORS] = ellipsis;
  }

  return (
    <div className="paging mb-2 btn-group">
      {Object.keys(links).map((linkIndex) => (
        <React.Fragment key={linkIndex}>{links[linkIndex]}</React.Fragment>
      ))}
    </div>
  );
};

export default Paging;
