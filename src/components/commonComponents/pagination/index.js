import React from "react";

const Pagination = ({ page, setPage, pageCount }) => {
  return (
    <nav>
      <ul className="pagination pagination-sm mt-3">
        <li
          className={`page-item cursor-pointer ${page === 1 ? "disabled" : ""}`}
        >
          <a onClick={() => setPage(1)} className="page-link">
            <i className="bi bi-chevron-double-left"></i>
          </a>
        </li>
        <li
          className={`page-item cursor-pointer ${page === 1 ? "disabled" : ""}`}
        >
          <a onClick={() => setPage(page - 1)} className="page-link">
            <i className="bi bi-chevron-left"></i>
          </a>
        </li>
        {pageCount <= 4 ? (
          <>
            {[...Array(pageCount)].map((_, index) => (
              <li
                key={index}
                className={`page-item cursor-pointer ${
                  page === index + 1 ? "active" : ""
                }`}
              >
                <a className="page-link" onClick={() => setPage(index + 1)}>
                  {index + 1}
                </a>
              </li>
            ))}
          </>
        ) : pageCount > 4 ? (
          page < 4 ? (
            <>
              {[...Array(5)].map((_, index) => (
                <li
                  key={index}
                  className={`page-item cursor-pointer ${
                    page === index + 1 ? "active" : ""
                  }`}
                >
                  <a className="page-link" onClick={() => setPage(index + 1)}>
                    {index + 1}
                  </a>
                </li>
              ))}
            </>
          ) : page < pageCount - 2 ? (
            <>
              <li className={`page-item cursor-pointer`}>
                <a className="page-link" onClick={() => setPage(page - 2)}>
                  {page - 2}
                </a>
              </li>
              <li className={`page-item cursor-pointer`}>
                <a className="page-link" onClick={() => setPage(page - 1)}>
                  {page - 1}
                </a>
              </li>
              <li className={`page-item cursor-pointer active`}>
                <a className="page-link" onClick={() => setPage(page)}>
                  {page}
                </a>
              </li>
              <li className={`page-item cursor-pointer`}>
                <a className="page-link" onClick={() => setPage(page + 1)}>
                  {page + 1}
                </a>
              </li>
              <li className={`page-item cursor-pointer`}>
                <a className="page-link" onClick={() => setPage(page + 2)}>
                  {page + 2}
                </a>
              </li>
            </>
          ) : page <= pageCount ? (
            <>
              <li
                className={`page-item cursor-pointer ${
                  page === pageCount - 4 ? "active" : ""
                }`}
              >
                <a className="page-link" onClick={() => setPage(pageCount - 4)}>
                  {pageCount - 4}
                </a>
              </li>
              <li
                className={`page-item cursor-pointer ${
                  page === pageCount - 3 ? "active" : ""
                }`}
              >
                <a className="page-link" onClick={() => setPage(pageCount - 3)}>
                  {pageCount - 3}
                </a>
              </li>
              <li
                className={`page-item cursor-pointer ${
                  page === pageCount - 2 ? "active" : ""
                }`}
              >
                <a className="page-link" onClick={() => setPage(pageCount - 2)}>
                  {pageCount - 2}
                </a>
              </li>
              <li
                className={`page-item cursor-pointer ${
                  page === pageCount - 1 ? "active" : ""
                }`}
              >
                <a className="page-link" onClick={() => setPage(pageCount - 1)}>
                  {pageCount - 1}
                </a>
              </li>
              <li
                className={`page-item cursor-pointer ${
                  page === pageCount ? "active" : ""
                }`}
              >
                <a className="page-link" onClick={() => setPage(pageCount)}>
                  {pageCount}
                </a>
              </li>
            </>
          ) : (
            <React.Fragment />
          )
        ) : (
          <React.Fragment />
        )}
        <li
          className={`page-item cursor-pointer ${
            page === pageCount ? "disabled" : ""
          }`}
        >
          <a onClick={() => setPage(page + 1)} className="page-link">
            <i className="bi bi-chevron-right"></i>
          </a>
        </li>
        <li
          className={`page-item cursor-pointer ${
            page === pageCount ? "disabled" : ""
          }`}
        >
          <a onClick={() => setPage(pageCount)} className="page-link">
            <i className="bi bi-chevron-double-right"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
