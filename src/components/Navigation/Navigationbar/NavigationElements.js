import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import Dropdown from "./Dropdown";

export const Nav = styled.nav`
  background-color: #30486a;
  position: fixed;
  height: 80px;
  display: flex;
  padding: 0.5rem;
  // padding: 0.5rem calc((100vw - 2000px) / 2);
  z-index: 10;
  justify-content: flex-start;
  @media screen and (max-width: 921px) {
    position: relative;
  }
`;

export const NavBrand = styled.div`
  color: white;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  height: 100%;
  justify-content: center;
  width: 220px;
  z-index: 10;
  @media screen and (max-width: 970px) {
    padding-right: 0rem;
    width: 180px;
  }

  @media screen and (max-width: 450px) {
    padding-right: 0rem;
    padding-left: 0;
    width: 128px;
    font-size: 14px;
  }
`;

export const NavLink = styled(Link)`
  color: lightgrey;
  display: flex;
  align-items: center;
  text-decoration: none !important;
  padding: 0 1rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  height: 100%;
  cursor: pointer;
  z-index: 10;
  &:hover {
    color: white;
    background-color: #6e95cc;
  }

  @media screen and (max-width: 970px) {
    padding-left: 0.8rem;
    padding-right: 0.8rem;
  }
`;

export const Icon = styled.div`
  display: none;
  color: #fff;
  transition: ${({ isOpen }) =>
    isOpen ? "0.01s ease-in-out" : "0.6s ease-in-out"};
  @media screen and (max-width: 921px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 25%);
    font-size: 1.8rem;
    cursor: pointer;
    opacity: ${({ isOpen }) => (isOpen ? "0" : "100%")};
  }
`;

export const SearchMin = styled.div`
  display: none;
  color: #fff;

  @media screen and (max-width: 921px) {
    display: flex;
  }
`;

export const SearchBtnMin = styled(IoMdSearch)`
  font-size: 1.7rem;
  @media screen and (max-width: 921px) {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-275%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const Bars = styled(FaBars)`
  color: #fff;
`;

export const CaretDownIcon = styled(FaCaretDown)`
  color: white;

  @media screen and (max-width: 921px) {
    display: none;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  white-space: nowrap;
  text-decoration: none;
  @media screen and (max-width: 921px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  position: absolute;
  position: fixed;
  padding: 0.5rem;

  align-items: center;
  margin-right: 24px;
  /* Third Nav */
  justify-content: flex-end;
  width: 100vw;
  @media screen and (max-width: 921px) {
    display: none;
  }
`;

export const NavBtnUser = styled.div`
  border-radius: 4px;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none !important;
  &:hover {
    transition: all 0.2s ease-in-out;
    color: white;
    // background: #fff;
    /* color: #010606; */
  }
`;

export const DropdownItem = styled.div`
  display: flex;
  align-items: center;
`;

export const UserDropdown = styled(Dropdown)`
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

export const NavSpan = styled.span`
  @media screen and (max-width: 1100px) {
    display: none;
  }
`;

export const UserBtn = styled(FaRegUser)`
  font-size: 1.4rem;
  @media screen and (max-width: 921px) {
    display: none;
  }
`;

export const SearchBtn = styled(IoMdSearch)`
  font-size: 1.7rem;
  @media screen and (max-width: 921px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  padding: 10px 22px;
  margin-right: 20px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none !important;
  &:hover {
    transition: all 0.2s ease-in-out;
    color: white;
  }
`;
