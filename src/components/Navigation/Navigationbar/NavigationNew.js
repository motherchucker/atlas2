import React, { useState, useEffect } from "react";
import "./NavigationElements.js";

import Logo from "../../Header/Logo";

import {
  Nav,
  NavBrand,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
  NavSpan,
  UserBtn,
  SearchBtn,
  CaretDownIcon,
  NavBtnUser,
  Icon,
  DropdownItem,
  UserDropdown,
  SearchMin,
  SearchBtnMin,
} from "./NavigationElements";

const NavigationNew = ({ isOpen, toggleMenu, closeDropdownMenu }) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  const onUserClick = () => {
    setOpenDropdown(!openDropdown);
  };

  useEffect(() => {
    if (closeDropdownMenu) {
      setOpenDropdown(false);
    }
  }, [closeDropdownMenu]);

  const navStyle = { color: "white", backgroundColor: "#6e95cc" };
  return (
    <>
      <Nav>
        <NavBrand>
          <Logo />
        </NavBrand>
        <SearchMin>
          <NavBtnLink to="/">
            <SearchBtnMin />
          </NavBtnLink>
          <Icon isOpen={isOpen} onClick={toggleMenu}>
            <Bars />
          </Icon>
        </SearchMin>

        <NavMenu>
          <NavLink activeStyle={navStyle} to="/custodianportal">
            Custodian Portal
          </NavLink>

          <NavLink activeStyle={navStyle} to="/matters">
            Matters
          </NavLink>

          <NavLink activeStyle={navStyle} to="/catalog">
            Catalog
          </NavLink>

          <NavLink activeStyle={navStyle} to="/tasks/all">
            Tasks
          </NavLink>

          <NavLink activeStyle={navStyle} to="/reports">
            Reports
          </NavLink>

          <NavLink activeStyle={navStyle} to="/admin">
            Admin
          </NavLink>
        </NavMenu>
        <NavBtn>
          {/* User dropdown */}
          <DropdownItem>
            <NavBtnUser onClick={() => onUserClick()}>
              <UserBtn /> <NavSpan>harish harish</NavSpan> <CaretDownIcon />
            </NavBtnUser>
            {/* If clicked on user, show dropdown */}
            {openDropdown && (
              <UserDropdown
                openDropdown={openDropdown}
                onUserClick={() => {
                  onUserClick();
                }}
              />
            )}
          </DropdownItem>
          <NavBtnLink to="/">
            <SearchBtn />
          </NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default NavigationNew;
