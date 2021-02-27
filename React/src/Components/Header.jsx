import React from "react";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();
  const setlogstate = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <>
      <nav>
        <div className="nav-wrapper white darken-1">
          <a href="/" className="brand-logo black-text">
            Comments App
          </a>
          <ul id="nav-mobile" className="right black-text">
            <li>
              <a className="black-text" href="/">
                Home
              </a>
            </li>
            <li>
              <a className="black-text" onClick={setlogstate} href="/">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
