import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Navigation.module.css";

const Navigation = () => {
  console.log("Rerender navigation");
  const navStyle = { color: "white", backgroundColor: "#6e95cc" };
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <NavLink activeStyle={navStyle} to="/custodianportal">
            Custodian Portal
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={navStyle} to="/matters">
            Matters
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={navStyle} to="/catalog">
            Catalog
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={navStyle} to="/tasks">
            Tasks
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={navStyle} to="/reports">
            Reports
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={navStyle} to="/admin">
            Admin
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
