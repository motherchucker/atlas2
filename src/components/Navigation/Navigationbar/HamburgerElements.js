import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

export const HamburgerContainer = styled.aside`
  position: relative;
  z-index: 999;
  width: 100%;
  height: 100%;
  display: ${({ isOpen }) => (isOpen ? "grid" : "none")};
  align-items: center;
  top: 0;
  left: 0;
  transition: 0.3s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  @media screen and (min-width: 922px) {
    opacity: 0;
    display: none;
  }
  /* Top to bottom animation */
  /* top: ${({ isOpen }) => (isOpen ? "10" : "-100vh")}; */
`;

export const CloseIcon = styled(FaTimes)`
  color: white;
`;

export const Icon = styled.div`
  position: absolute;
  display: block;
  top: 12px;
  right: 29px;
  background: transparent;
  cursor: pointer;
  font-size: 1.8rem;
  outline: none;
`;

export const HamburgerWrapper = styled.div`
  display: flex;
  top: 5rem;
  justify-content: center;
  position: relative;
`;

export const HamburgerMenu = styled.ul`
  display: grid;
  border-top: 2px solid white;
  background: #30486a;
  width: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 65px);
  padding-inline-start: 40px;
  padding-inline-end: 40px;
  padding-bottom: 10px;
  text-align: center;
  position: absolute;

  @media screen and (max-height: 730px) {
    grid-template-rows: repeat(6, 55px);
  }

  @media screen and (max-height: 670px) {
    grid-template-rows: repeat(6, 40px);
  }

  @media screen and (max-height: 520px), and(max-width: 921px) {
    // grid-template-rows: repeat()
  }
`;

export const HamburgerHr = styled.hr`
  width: 100%;
  height: 5;
  margin-top: 0px !important;
  margin-bottom: 0px !important;
  border: 1px solid grey;
`;

export const HamburgerLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  text-decoration: none !important;
  list-style: none;
  transition: 0.2s ease-in-out;
  color: lightgrey;
  cursor: pointer;

  &:hover {
    color: white;
    background-color: #6e95cc;
    transition: 0.2s ease-in-out;
  }
`;
