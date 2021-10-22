import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Content from "./Content";
import Sidebar from "../Navigation/Sidebar/Sidebar";
import "./MainContent.css";

const MainContent = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const location = useLocation();
  const currentLocation = location.pathname;

  useEffect(() => {
    const reg = RegExp("/tasks.*");
    const isTaskTab = reg.test(currentLocation);

    if (isTaskTab) {
      setShowSidebar(true);
    } else {
      setShowSidebar(false);
    }
  }, [currentLocation]);

  return (
    <div className="content-main">
      <div className="col sidebar-col">{showSidebar && <Sidebar />}</div>
      <div className="col">
        <div className="container-fluid">
          <Content />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
