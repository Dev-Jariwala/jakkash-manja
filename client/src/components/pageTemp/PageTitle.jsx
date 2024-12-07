import React from "react";
import { Link } from "react-router-dom";

const PageTitle = ({ pageName, children }) => {
  return (
    <div className="page">
      <div className="p-title">
        <h2 className={`text-2xl font-bold`}>
          <Link to={"/"}>Dashboard</Link>
          {pageName !== "Dashboard" && (
            <>
              <span className="material-icons">navigate_next</span> {pageName}
            </>
          )}
        </h2>
      </div>
      {children}
    </div>
  );
};

export default PageTitle;
