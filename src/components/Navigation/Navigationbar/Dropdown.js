import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import "./UserDropdown.css";

const Dropdown = ({ openDropdown, onUserClick }) => {
  const navStyle = {
    color: "white",
    // backgroundColor: "#6e95cc",
    textDecoration: "none",
  };
  return (
    <Fragment>
      <ul
        onClick={onUserClick}
        className={
          openDropdown ? "user-dropdown-menu clicked" : "user-dropdown-menu"
        }
      >
        <li>
          <NavLink
            activeStyle={navStyle}
            to="/"
            onClick={() => onUserClick}
            className="dropdown-link"
          >
            My account
          </NavLink>
        </li>
        <li>
          <NavLink
            activeStyle={navStyle}
            to="/"
            onClick={() => onUserClick}
            className="dropdown-link"
          >
            Settings
          </NavLink>
        </li>
        <li>
          <NavLink
            activeStyle={navStyle}
            to="/"
            onClick={() => onUserClick}
            className="dropdown-link"
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </Fragment>
  );
};

export default Dropdown;
