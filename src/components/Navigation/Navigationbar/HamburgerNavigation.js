import React from "react";
import {
  HamburgerContainer,
  Icon,
  CloseIcon,
  HamburgerWrapper,
  HamburgerMenu,
  HamburgerLink,
  HamburgerHr,
} from "./HamburgerElements";

const MobileNavigation = ({ isOpen, toggleMenu }) => {
  const navStyle = { color: "white", backgroundColor: "#6e95cc" };

  return (
    <HamburgerContainer isOpen={isOpen} onClick={toggleMenu}>
      <Icon onClick={toggleMenu}>
        <CloseIcon />
      </Icon>
      <HamburgerWrapper>
        <HamburgerMenu>
          <HamburgerLink activeStyle={navStyle} to="/custodianportal">
            Custodian Portal
          </HamburgerLink>

          <HamburgerLink activeStyle={navStyle} to="/matters">
            Matters
          </HamburgerLink>

          <HamburgerLink activeStyle={navStyle} to="/catalog">
            Catalog
          </HamburgerLink>

          <HamburgerLink activeStyle={navStyle} to="/tasks/all">
            Tasks
          </HamburgerLink>

          <HamburgerLink activeStyle={navStyle} to="/reports">
            Reports
          </HamburgerLink>

          <HamburgerLink activeStyle={navStyle} to="/admin">
            Admin
          </HamburgerLink>
          <HamburgerHr />
          <HamburgerLink activeStyle={navStyle} to="/account">
            My account
          </HamburgerLink>
          <HamburgerLink activeStyle={navStyle} to="/settings">
            Settings
          </HamburgerLink>
          <HamburgerLink activeStyle={navStyle} to="/logout">
            Logout
          </HamburgerLink>
        </HamburgerMenu>
      </HamburgerWrapper>
    </HamburgerContainer>
  );
};

export default MobileNavigation;
