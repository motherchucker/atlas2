import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useWindowSize from "../components/CustomHooks/useWindowsSize";

import NavigationBootstrap from "./Navigation/Navigationbar/NavigationNew";
import MobileNavigation from "./Navigation/Navigationbar/HamburgerNavigation";
import MainContent from "./Content/MainContent";
import "./App.css";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [closeDropdownMenu, setCloseDropdownMenu] = useState(false);
  const windowWidth = useWindowSize();

  useEffect(() => {
    if (windowWidth < 929) {
      setCloseDropdownMenu(true);
    } else {
      setCloseDropdownMenu(false);
    }
  }, [windowWidth]);

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Fragment>
      <BrowserRouter>
        <MobileNavigation isOpen={isOpen} toggleMenu={toggleMobileMenu} />
        <NavigationBootstrap
          isOpen={isOpen}
          closeDropdownMenu={closeDropdownMenu}
          toggleMenu={toggleMobileMenu}
        />
        <div>
          <MainContent />
        </div>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
