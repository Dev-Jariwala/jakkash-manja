import React, { useContext, useState } from "react";
import "./SideMenu.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// Other styled components can be defined similarly...

// Create your functional component
const SideMenu = ({ sidemenuProps, setAuth, children }) => {
  const { brandName, brandSlogan, brandLogo, sbOptions } = sidemenuProps;
  const [darkMode, setDarkMode] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const handleSidebarOpen = () => {
    setSidebar(true);
  };

  const handleSidebarClose = () => {
    setSidebar(false);
  };

  return (
    <div className={`body ${darkMode ? "dark" : ""} dark:bg-gray-900`}>
      <nav
        className={`sidebar ${sidebar ? "" : "close"}`}
        onMouseEnter={handleSidebarOpen}
        onMouseLeave={handleSidebarClose}
      >
        <header>
          <div className="image-text">
            <span className="image">
              <img src={brandLogo} alt={brandLogo} />
            </span>

            <div className="text logo-text">
              <span className="name">{brandName}</span>
              <span className="profession">{brandSlogan}</span>
            </div>
          </div>

          <i
            className="bx bx-chevron-right toggle"
            onClick={() => setSidebar((prev) => !prev)}
          ></i>
        </header>

        <div className="menu-bar">
          <div className="menu">
            <li
              className="search-box"
              onClick={() => setSidebar((prev) => !prev)}
            >
              <i className="bx bx-search icon"></i>
              <input
                id="searh-page"
                type="text"
                placeholder="Search Ganes..."
              />
            </li>

            <ul className="menu-links">
              {sbOptions &&
                sbOptions.map((option, index) => (
                  <li className="nav-link" key={index}>
                    <Link to={option.to}>
                      <i className="material-icons icon">{option.icon}</i>
                      <span className="text nav-text">{option.title}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div className="bottom-content">
            <li
              className=""
              onClick={() => {
                setAuth(false);
                toast.success("Loged out!");
              }}
            >
              <Link to={""}>
                <i className="bx bx-log-out icon"></i>
                <span className="text nav-text">Logout</span>
              </Link>
            </li>

            <li
              className="mode"
              onClick={() => {
                setDarkMode((prev) => !prev);
              }}
            >
              <div className="sun-moon">
                {darkMode ? (
                  <i className="bx bx-sun icon sun"></i>
                ) : (
                  <i className="bx bx-moon icon moon"></i>
                )}
              </div>
              <span className="mode-text text">
                {darkMode ? "Light mode" : "Dark mode"}
              </span>

              <div className="toggle-switch">
                <span className="switch"></span>
              </div>
            </li>
          </div>
        </div>
      </nav>

      <section className="home">
        <div className="home-container">{children}</div>
      </section>
    </div>
  );
};

export default SideMenu;
